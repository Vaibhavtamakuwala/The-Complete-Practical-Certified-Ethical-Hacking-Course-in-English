const EventEmitter = require("events");
EventEmitter.defaultMaxListeners = 50;
const { videoProcessing } = require("../config/queueConfig");

const Jobs = require("./queueJobs");
for (let identity in Jobs._processors) {
  videoProcessing.process(identity, 1, Jobs._processors[identity]);
}
