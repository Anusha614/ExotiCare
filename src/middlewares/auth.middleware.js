import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const jwtVerify = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken.id).select("-password -refreshToken")

        if(!user) {
            throw new ApiError(404, "user not found")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "invalid access token", error.message)
    }
})