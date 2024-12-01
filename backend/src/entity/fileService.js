const fs = require("fs");
const path = require("path");

class FileService {
  constructor() {
    this.uploadDir = path.join(__dirname, "../../upload/config");
    this.ensureUploadDirectory();
  }

  ensureUploadDirectory() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  saveCompletedFile(fileName, buffer, size, folderName) {
    const folderPath = path.join(this.uploadDir, folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const finalPath = path.join(folderPath, fileName);
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
