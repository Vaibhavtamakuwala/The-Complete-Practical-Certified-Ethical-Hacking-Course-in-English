const { sendEmail } = require("./emailService");
const { convertFile } = require("./fileService");

module.exports = {
  _processors: {
    convertVideo: async ({ data }) => {
      try {
        console.log('data: ', data);
        console.info("Video processing started.");
        await convertFile(data);
        console.info("Video processing finished.");
      } catch (error) {
        console.error("Error - convertVideo", error);
      }
    },
    sendMail: async ({ data }) => {
      try {
        console.info("processing email sent");
        await sendEmail(data);
        console.info("finish email sent");
      } catch (error) {
        console.error("Error - sendMail", error);
      }
    },
  },
};
