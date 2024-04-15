const cron = require("node-cron");

cron.schedule("*/1 * * * *", async function () {
  console.info(`--- Cron Started --- ${new Date().toLocaleString()}`);
  require("./jobConsumer");
});
