import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import Note from "./noteModel.js";
import bcrypt from 'bcryptjs';
const { sign, verify } = jwt;

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength:8
    },
    tokens: [
        {
            token:{
                type: String,
                required: true, 
            }
        }
    ]
}, {
    timestamps: true
})
// Linking user with note-----------------
userSchema.virtual("notes", {
    ref: "Note",
    localField: "_id",
    foreignField: "owner",
});


// SO that password and token is not sent with user object----------

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};
// Generating auth token --------------------------------
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = sign(
        { _id: user.id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// Encrypting password with bcrypt module ------------------
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

 // Checking if password is correct or not --------------------
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre("remove", async function (next) {
    const user = this;
    await Note.deleteMany({ owner: user._id });
    next();
});


const User = mongoose.model("User" , userSchema);

export default User