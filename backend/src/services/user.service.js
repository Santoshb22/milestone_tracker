const User = require("../models/user.model");

class UserService {
  async createUser(user) {
    const emailTaken = await User.isEmailTaken(user.email);
    if (emailTaken) throw new Error("Email is already taken");

    const result = await User.create(user);
    return result;
  }

  async loginUser(username, password) {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) throw new Error("Username is incorrect");

    const isPassword = await user.isPasswordMatch(password);
    if (!isPassword) throw new Error("Password is incorrect");

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    return loggedInUser;
  }

  async generateTokens(userId) {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  }
}

module.exports = new UserService(); // export instance
