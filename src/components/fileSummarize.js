import fs from "fs";

function summarizeFilesInDirectorySync(directory) {
  return fs.readdirSync(directory).map((fileName) => ({
    directory,
    fileName,
  }));
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
