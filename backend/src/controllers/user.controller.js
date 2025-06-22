const UserService = require("../services/user.service");

class UserController {
  async register(req, res) {
    try {
      const { email, username, password } = req.body;
      if ([email, password, username].some(field => !field?.trim())) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newUser = await UserService.createUser(req.body);
      const tokens = await UserService.generateTokens(newUser._id);

      return res.status(201).json({
        message: "Success",
        result: {
          newUser,
          tokens,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      if ([username, password].some(field => !field?.trim())) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await UserService.loginUser(username, password);
      const tokens = await UserService.generateTokens(user._id);

      return res.status(200).json({
        message: "Success",
        result: {
          user,
          tokens,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
