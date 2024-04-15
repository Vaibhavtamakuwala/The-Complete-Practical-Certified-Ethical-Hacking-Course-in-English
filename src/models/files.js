const mongoose = require("mongoose");
const { FILE_STATUS } = require("../constants");

const Schema = mongoose.Schema;
const schema = new Schema(
  {
    nm: { type: String }, // Name
    oriNm: { type: String }, // Original name
    type: { type: String },
    exten: { type: String }, // Extension
    uri: { type: String },
    mp4Url: { type: String },
    mimeType: { type: String },
    size: { type: Number },
    sts: { type: Number, default: FILE_STATUS.PENDING }, // Status (Pending = 1, Uploading = 1, Converting = 2, Completed = 4)
    dimensions: { height: Number, width: Number },
    preview: { type: String },
  },
  { timestamps: true }
);

const file = mongoose.model("file", schema, "files");
module.exports = file;
