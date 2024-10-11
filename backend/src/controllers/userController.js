const db = require("../models/index");
let getUserTest = async (req, res) => {
  try {
    const users = await db.User.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserTest };
