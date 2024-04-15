const { videoProcessing } = require("../config/queueConfig");

const createJob = async (name, data, options = {}) => {
  const opts = { priority: 0, attempts: 3, delay: 2000 };

  videoProcessing.add(name, data, {
    priority: options.priority || opts.priority,
    attempts: options.attempts || opts.attempts,
    delay: options.delay || opts.delay,
    removeOnComplete: true,
    removeOnFail: false,
  });
};

module.exports = { createJob };
