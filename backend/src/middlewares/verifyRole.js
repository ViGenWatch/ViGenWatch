const VerifyRoleAuthority = (req, res, next) => {
  try {
    const user = req.user;
    const { role } = user;
    if (role !== "0x02") {
      return res.status(401).json({
        status: "failed",
        message: "You are not authorized to view this page."
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error"
    });
  }
};

const VerifyRoleUser = (req, res, next) => {
  try {
    const user = req.user;
    const { role } = user;
    if (role !== "0x01") {
      return res.status(401).json({
        status: "failed",
        message: "You are not authorized to view this page."
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error"
    });
  }
};

module.exports = { VerifyRoleAuthority, VerifyRoleUser };
