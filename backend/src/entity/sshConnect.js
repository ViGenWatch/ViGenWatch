const { Client } = require("ssh2");

class SSHConnection {
  constructor() {
    this.client = new Client();
    this.isConnected = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client
        .on("ready", () => {
          this.isConnected = true;
          console.log("SSH Client :: ready");
          resolve();
        })
        .connect({
          host: "nextclade_ubuntu",
          port: 22,
          username: "khaitd0340",
          password: "khaitd262323"
        });
    });
  }

  executeInline(command, cwd) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        return reject(new Error("SSH Client is not connected"));
      }
      this.client.exec(`cd ${cwd} && ${command}`, (err, stream) => {
        if (err) return reject(err);
        let output = "";
        stream
          .on("close", (code, signal) => {
            if (code !== 0) {
              console.error(`Error: Command failed with code ${code}`);
              reject(new Error(`Command failed with code ${code}`));
            } else {
              resolve({ code, output });
            }
          })
          .on("data", (data) => {
            output += data.toString();
          })
          .stderr.on("data", (data) => {
            console.log("STDERR: " + data);
          });
      });
    });
  }

  close() {
    this.client.end();
    this.isConnected = false;
  }
}

const sshConnection = new SSHConnection();
module.exports = sshConnection;
