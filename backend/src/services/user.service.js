const User = require("../models/user.model");

const createUser = async(user) => {
    try {
        const emailTaken = await User.isEmailTaken(user.email);
        if(emailTaken){
            throw new Error("Email is already taken");
        } else {
            const result = await User.create(user);
            return result;
        }
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}

const loginUser = async ( username, password ) => {
    try {
        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) throw new Error("Username is incorrect");

        const isPassword = await user.isPasswordMatch(password);
        if (!isPassword) throw new Error("Password is incorrect");

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        return loggedInUser;
    } catch (error) {
        throw new Error(`Failed to login user: ${error.message}`);
    }
}

module.exports = {
    createUser,
    loginUser
}