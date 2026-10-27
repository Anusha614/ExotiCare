
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true
        },
        displayName: {
            type: String,
            required: [true, 'Display name is required'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false
        },
        profilePicture: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        refreshToken: {
            type: String,
            default: null,
            select: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model('User', userSchema);
