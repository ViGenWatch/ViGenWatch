const fs = require("fs");
const path = require("path");

class FileService {
  constructor() {
    this.ConfigDir = path.join(__dirname, "../../upload/config");
    this.UploadDir = path.join(__dirname, "../../upload");
    this.ensureConfigDirectory();
  }

  ensureConfigDirectory() {
    if (!fs.existsSync(this.ConfigDir)) {
      fs.mkdirSync(this.ConfigDir, { recursive: true });
    }
  }

  saveCompletedFile(fileName, buffer, size, folderName) {
    const folderPath = path.join(this.ConfigDir, folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const finalPath = path.join(folderPath, fileName);
    fs.writeFileSync(finalPath, buffer.slice(0, size));
    return finalPath;
  }

  saveCompletedInputFile(fileName, buffer, size, folderName, userName) {
    const folderPath = path.join(this.UploadDir, `${userName}_workspace`, folderName);
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
