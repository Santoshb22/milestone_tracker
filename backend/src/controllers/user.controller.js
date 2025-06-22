const {createUser, loginUser} = require("../services/user.service");
const User = require("../models/user.model");

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false});

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new Error(`Failed to create access or refresh token: ${error.message}`);
    }
}

const register = async (req, res) => {
    try {
        const {email, username, password} = req.body;
        if([email, password, username].some(field => field.trim() === "")){
            return res.status(400).json({message: "All fields are required"});
        }

        const newUser = await createUser(req.body);
        const tokens = await generateAccessAndRefreshToken(newUser._id);
        const result = {
            newUser,
            tokens
        } 
        return res.status(201).json({result, message: "Success"});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        if([username, password].some(field => field.trim() === "")) {
            throw new Error("All fields are required");
        }

        const loggedIn = await loginUser(username, password);
        const tokens = await generateAccessAndRefreshToken(loggedIn._id);
        const result = {
            user: loggedIn,
            tokens
        }
        return res.status(200).json({message: "Success", result});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

module.exports = {
    register,
    login
}