const Files = require("../models/files");
const { FILE_STATUS, FILE_MESSAGES } = require("../constants");
const { createJob } = require("./jobProducer");
const { sendEmailToUser } = require("./emailService");
const { EMAIL_MESSAGE } = require("../constants/messages");
const { exec } = require("child_process");
const path = require("path");

const fileStore = async (files) => {
  try {
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        if (
          !file.originalname.match(/\.(mp4|MP4|webm|WEBM|avi|AVI|MKV|mkv)$/)
        ) {
          throw new Error(FILE_MESSAGES.SUPPORTED_FILE_TYPES);
        }
        console.info("File status: pending");
        const data = {
          nm: file.filename.split(".").shift(),
          oriNm: file.originalname,
          type: file.mimetype,
          exten: file.originalname.split(".").pop(),
          mimeType: file.mimetype,
          size: file.size,
          sts: FILE_STATUS.UPLOADING,
          uri: `/upload/${file.filename}`,
        };
        console.info("File status: Uploading");
        const storedFile = await Files.create(data);
        await createJob("convertVideo", {
          fileName: storedFile.nm,
          fileId: storedFile.id,
          extension: storedFile.exten,
        });
        return data;
      })
    );
    // await storeDataInRedis(uploadedFiles);
    return uploadedFiles;
  } catch (error) {
    console.error("Error - fileStore: ", error);
    throw new Error(error);
  }
};
const convertFile = async (videoFile) => {
  try {
    // Sending email.
    sendEmailToUser("vaibhavtamakuwala95@gmail.com", EMAIL_MESSAGE.subject, EMAIL_MESSAGE.body(videoFile.fileName) ).then();
    console.info("File status: Converting");
    await updateFile(videoFile.fileId, {
      sts: FILE_STATUS.CONVERTING,
    });

    const inputPath = path.join(baseDir,`/upload/${videoFile.fileName}.${videoFile.extension}`);
    const outputPath = path.join(baseDir, `/upload/${videoFile.fileName}.mp4`);
    const command = `ffmpeg -i "${inputPath}" -c:v libx264 -preset medium -c:a aac -strict experimental "${outputPath}"`;

    exec(command, async (error, stdout, stderr) => {
      console.log("stdout: ", stdout);
      console.info("File status: Completed");
      if (error || stderr) {
        console.error(
          `Error converting ${videoFile.fileName}: ${error?.message ?? stderr}`
        );
        return;
      }
      console.info(`File ${videoFile.fileName} has been converted successfully.`);
      await updateFile(videoFile.fileId, {
        mp4Url: `/upload/${videoFile.fileName}.mp4`,
        sts: FILE_STATUS.COMPLETED,
      });
    });
  } catch (error) {
    console.error("Error - videoProcessing: ", error);
  }
};

const updateFile = async (fileId, updateObj) => {
  try {
    await Files.updateOne({ _id: fileId }, updateObj);
  } catch (error) {
    console.error("Error - updateFile: ", error);
    throw new Error(error);
  }
};

module.exports = {
  fileStore,
  convertFile,
  updateFile,
};
