const nodemailer = require("nodemailer");
const { EMAIL_SERVICE } = require("../config");
const { createJob } = require("./jobProducer");
const AWS = require("aws-sdk");

const sendEmail = (emailObj) => {
  try {
    const { email, subject, body } = emailObj;
    AWS.config.update({
      credentials: {
        accessKeyId: EMAIL_SERVICE.AWS_ACCESS_ID,
        secretAccessKey: EMAIL_SERVICE.AWS_SECRET_KEY,
      },
      region: EMAIL_SERVICE.REGION,
    });
    let transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: "2010-12-01",
      }),
    });
    const mailOptions = {
      from: EMAIL_SERVICE.SENDER_EMAIL,
      to: email, // User email will be placed here. As of now, setting my email for the task.
      subject: subject,
      html: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.info("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error - sendEmail: ", error);
    throw new Error(error);
  }
};

const sendEmailToUser = async (email, subjectData, bodyData) => {
  const mailObj = {
    email: email,
    subject: subjectData,
    body: bodyData,
  };
  await createJob("sendMail", mailObj);
};

module.exports = {
  sendEmailToUser,
  sendEmail,
};
