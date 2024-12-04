const referenceFileService = require("../services/referenceFileService");
const sshConnection = require("../entity/sshConnect");
const augurVariable = require("../utils/augur");
const workspace = require("../utils/workspace");

class RunCommandAnalysis {
  constructor(data) {
    this.referenceId = data.referenceId;
    this.userName = data.userName;
    this.executionName = data.executionName;
  }

  async runCommandExecution() {
    const workspaceName = workspace.formatWorkspaceName(this.userName);
    const referenceFile = await referenceFileService.getReferenceFileByReferenceId(this.referenceId);
    const referenceFileProperties = {
      auspiceConfig: referenceFile.auspiceConfig,
      colors: referenceFile.colors,
      droppedTrains: referenceFile.droppedTrains,
      includeTrains: referenceFile.includeTrains,
      latLongs: referenceFile.latLongs,
      virusOutgroup: referenceFile.virusOutgroup
    };
    const commandParams = Object.entries(referenceFileProperties)
      .filter(([key, value]) => value != null)
      .map(([key, value]) => {
        return `--${key}="${value}"`;
      })
      .join(" ");
    if (!sshConnection.isConnected) {
      await sshConnection.connect();
    }
    const result = await sshConnection.executeInline(
      `${augurVariable.augur_run} ${augurVariable.augur_data_path}${workspaceName}/${this.executionName} ${commandParams}`,
      augurVariable.augur_script_path
    );

    if (result) {
      return result;
    }
    return null;
  }
}

module.exports = RunCommandAnalysis;
