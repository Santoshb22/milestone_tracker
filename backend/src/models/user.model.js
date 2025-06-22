const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    refreshToken: {
        type: String
    }
},

{
  timestamps: true
}

)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();
})

userSchema.methods.isPasswordMatch = async function(password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {id: this._id, username: this.username},
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`}
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {id: this._id},
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {expiresIn: `${process.env.JWT_REFRESH_EXPIRATION_DAYS}d`}
    )
}

userSchema.statics.isEmailTaken = async function(email) {
    const result = await this.findOne({email});
    if(result) return true;
    else return false;
}

userSchema.statics.usernameTaken = async function(username) {
    const result =await this.findOne({username});
    if(result) return true;
    else return false;
}

const User = mongoose.model("User", userSchema);

module.exports = User;