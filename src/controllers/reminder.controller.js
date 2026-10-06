import {isValidObjectId} from "mongoose";
import asyncHandler from "express-async-handler";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {Reminder} from "../models/reminder.model.js";
import { Pet } from "../models/pets.model.js";

export const createReminder = asyncHandler(async (req, res) => { 
    const { pet, title, type, dueDate, recurring, recurrence } = req.body;

    if (!pet || !title || !type || !dueDate) {
        throw new apiError(400, "Pet, title, type, and dueDate are required fields");
    }

    const petData = await Pet.findById(pet);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(403, "You are not authorized to add a reminder for this pet");
    }
    
    const reminder = await Reminder.create({
        pet,
        title,
        type,
        dueDate,
        recurring: recurring || false,
        recurrence: recurrence || null
    });

    return res.status(201).json(new ApiResponse(201, reminder, "Reminder created successfully"));
});