const fs = require("fs");
const path = require("path");

class FileService {
  constructor() {
    this.uploadDir = path.join(__dirname, "../../uploads");
    this.ensureUploadDirectory();
  }

  ensureUploadDirectory() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  saveCompletedFile(fileName, buffer, size) {
    const finalPath = path.join(this.uploadDir, fileName);
    fs.writeFileSync(finalPath, buffer.slice(0, size));
    return finalPath;
  }

  cleanupTempFile(filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

module.exports = new FileService();
