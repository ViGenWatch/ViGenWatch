const sshConnection = require("../entity/sshConnect");
const CustomError = require("../entity/customError");

const CommandRunExecution = async (req, res) => {
  try {
    if (!sshConnection.isConnected) {
      await sshConnection.connect();
    }
    const result = await sshConnection.executeInline(
      "./run_pipeline.sh ../augur_data/khaitd01_workspace/execution_2",
      "/augur/augur_script/"
    );
    if (result) {
      return res.status(200).json({ mesage: "verry good" });
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
