class UploadSession {
  constructor(files) {
    this.files = files.map((file) => ({
      name: file.name,
      size: file.size,
      receivedChunks: new Set(),
      buffer: Buffer.alloc(0)
    }));
    this.cleanupTimer = null;
  }

  getFile(fileIndex) {
    return this.files[fileIndex];
  }

  updateFolderName(sesstionID) {
    this.files.forEach((file) => {
      file.folderName = sesstionID;
    });
  }

  updateChunk(fileIndex, chunkIndex, chunkData, chunkSize) {
    const file = this.getFile(fileIndex);
    if (!file) return false;

    const newBuffer = Buffer.alloc(Math.max(file.buffer.length, (chunkIndex + 1) * chunkSize));
    file.buffer.copy(newBuffer);
    chunkData.copy(newBuffer, chunkIndex * chunkSize);
    file.buffer = newBuffer;
    file.receivedChunks.add(chunkIndex);

    return true;
  }

  isFileComplete(fileIndex, chunkSize) {
    const file = this.getFile(fileIndex);
    return file && file.receivedChunks.size * chunkSize >= file.size;
  }

  cleanup() {
    this.files.forEach((file) => {
      if (file.buffer) {
        file.buffer = null;
      }
    });
  }
}

module.exports = UploadSession;
