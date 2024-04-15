const Queue = require("bull");
const { REDIS } = require("./index");

const opts = {
  redis: {
    port: REDIS.PORT,
    host: REDIS.HOST,
    db: 5,
    options: {},
  },
};

const videoProcessing = new Queue("videoProcessingQueue", opts);

console.info("bull-job-queue loaded 🎯");

const handleFailure = (job, err) => {
  if (job.attemptsMade >= job.opts.attempts) {
    console.info(`🤯   Job failures above threshold ${job.name}`, err);
    job.remove();
    return null;
  }
  console.info(
    `🤯   Job ${job.name} failed with ${err.message}. ${
      job.opts.attempts - job.attemptsMade
    } attempts left`
  );
};

const handleCompleted = (job) => {
  console.info(`🌿 Job ${job.name} completed`);
  job.remove();
};

const handleStalled = (job) => {
  console.info(`🌿 Job ${job.name} stalled`);
};

videoProcessing.on("failed", handleFailure);
videoProcessing.on("completed", handleCompleted);
videoProcessing.on("stalled", handleStalled);

module.exports = {
  videoProcessing
};
