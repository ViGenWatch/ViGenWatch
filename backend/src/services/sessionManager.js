const crypto = require("crypto");
const UploadSession = require("../entity/UploadSesstion");

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  createSession(files) {
    const sessionId = crypto.randomUUID();
    const session = new UploadSession(files);

    // Tự động cleanup sau 30 phút
    session.cleanupTimer = setTimeout(
      () => {
        this.cleanupSession(sessionId);
      },
      30 * 60 * 1000
    );

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  getSession(sessionId) {
    return this.sessions.get(sessionId);
  }

  cleanupSession(sessionId) {
    const session = this.sessions.get(sessionId);
    if (session) {
      clearTimeout(session.cleanupTimer);
      session.cleanup();
      this.sessions.delete(sessionId);
    }
  }
}

module.exports = new SessionManager();
