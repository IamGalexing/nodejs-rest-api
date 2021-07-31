const service = require("../../services/fetch");
const auth = require("../../services/validation/auth");

const register = async (req, res, next) => {
  const { error } = auth.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "missing required field",
    });
  }
  const { email, password } = req.body;
  try {
    const result = await service.findUser({ email });
    if (result) {
      return res.status(409).json({
        message: "Email in use",
      });
    }
    await service.addNewUser({ email, password });
    res.status(201).json({
      email,
      subscription: "starter",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = register;
