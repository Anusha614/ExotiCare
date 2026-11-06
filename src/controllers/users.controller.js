import express from 'express';
import {asyncHandler} from "./../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/users.model.js";
import { isValidObjectId } from "mongoose";

//create user or register user or signup
export const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password, location, displayName} = req.body;

    if (!username || !email || !password) {
        throw new apiError(400, "Username, email and password are required");
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        throw new ApiError(400, "Username or email already exists");
    }

    const registeredUser = await User.create({
        username,
        email,
        password,
        location,
        displayName
    });

    return res
        .status(201)
        .json(new ApiResponse(201, registeredUser.username, "User registered successfully!"));
})
//login user
export const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new apiError(400, "Username and password are required");
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
        throw new apiError(401, "Invalid username or password");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { accessToken }, "User logged in successfully!"));
})
//get all users
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    return res
        .status(200)
        .json(new ApiResponse(200, users, "Users fetched successfully!"));
})
//get user by id
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new apiError(400, "Invalid user ID");
    }

    const user = await User.findById(id);

    if (!user) {
        throw new apiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully!"));
})
//updatet user by id
export const updateUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email, location, displayName } = req.body;

    if (!isValidObjectId(id)) {
        throw new apiError(400, "Invalid user ID");
    }

    const user = await User.findById(id);

    if (!user) {
        throw new apiError(404, "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, location, displayName },
        { new: true, runValidators: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "User updated successfully!"));
})
//delete user by id
export const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new apiError(400, "Invalid user ID");
    }

    const user = await User.findById(id);

    if (!user) {
        throw new apiError(404, "User not found");
    }

    await User.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "User deleted successfully!"));
})