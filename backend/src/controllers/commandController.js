const sshConnection = require("../entity/sshConnect");
const CustomError = require("../entity/customError");
const path = require("path");
const fs = require("fs");

const CommandRunExecution = async (req, res) => {
  try {
    if (!sshConnection.isConnected) {
      await sshConnection.connect();
    }
    const result = await sshConnection.executeInline(
      "./run_pipeline.sh ../augur_data/khaitd01_workspace/execution_4",
      "/augur/augur_script/"
    );
    if (result) {
      const dataPath = path.resolve(__dirname, "../../upload/khaitd01_workspace/execution_4/auspice/zika.json");
      const readStream = fs.createReadStream(dataPath);
      readStream.on("open", () => {
        res.set("Content-Type", "application/json");
        readStream.pipe(res);
      });
      readStream.on("error", (err) => {
        console.warn(`Failed to read ${filePath}`);
        console.error(err);
        res.sendStatus(404);
      });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { CommandRunExecution };
