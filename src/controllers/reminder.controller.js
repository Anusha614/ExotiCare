import { isValidObjectId } from "mongoose";
import asyncHandler from "express-async-handler";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Reminder from "../models/reminder.model.js";
import { Pet } from "../models/pets.model.js";

// create new reminder

export const createReminder = asyncHandler(async (req, res) => {
    const {
        pet,
        title,
        completed,
        type,
        dueDate,
        recurring,
        recurrence,
    } = req.body;

    if (!pet || !title || !type|| !dueDate) {
        throw new apiError(400, "Pet, title, type, and due date are required");
    }

    if (!isValidObjectId(pet)) {
        throw new apiError(400, "Invalid pet ID");
    }

    const petData = await Pet.findById(pet);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not authorized to create a reminder for this pet"
        );
    }

    const reminder = await Reminder.create({
        pet,
        title,
        completed,
        type,
        dueDate,
        recurring,
        recurrence
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                reminder,
                "Reminder created successfully"
            )
        );
});


// get all reminders of logged-in user's pets

export const getMyReminders = asyncHandler(async (req, res) => {

    const userPets = await Pet.find({
        owner: req.user._id
    }).select("_id");

    const petIds = userPets.map((pet) => pet._id);

    const reminders = await Reminder.find({
        pet: { $in: petIds }
    }).sort({ date: 1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                reminders,
                "Reminders retrieved successfully"
            )
        );
});


// get reminders for a specific pet

export const getPetReminders = asyncHandler(async (req, res) => {

    const { petId } = req.params;

    if (!isValidObjectId(petId)) {
        throw new apiError(400, "Invalid pet ID");
    }

    const petData = await Pet.findById(petId);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not authorized to view reminders for this pet"
        );
    }

    const reminders = await Reminder.find({
        pet: petId
    }).sort({ dueDate: 1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                reminders,
                "Pet reminders retrieved successfully"
            )
        );
});


// get reminder by id

export const getReminderById = asyncHandler(async (req, res) => {

    const { reminderId } = req.params;

    if (!isValidObjectId(reminderId)) {
        throw new apiError(400, "Invalid reminder ID");
    }

    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
        throw new apiError(404, "Reminder not found");
    }

    const petData = await Pet.findById(reminder.pet);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not authorized to view this reminder"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                reminder,
                "Reminder retrieved successfully"
            )
        );
});


// update reminder

export const updateReminder = asyncHandler(async (req, res) => {

    const { reminderId } = req.params;

    const {
        title,
        completed,
        type,
        dueDate,
        recurring,
        recurrence
    } = req.body;

    if (!isValidObjectId(reminderId)) {
        throw new apiError(400, "Invalid reminder ID");
    }

    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
        throw new apiError(404, "Reminder not found");
    }

    const petData = await Pet.findById(reminder.pet);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not authorized to update this reminder"
        );
    }

    const updatedReminder = await Reminder.findByIdAndUpdate(
        reminderId,
        {
            title,
            completed,
            type,
            dueDate,
            recurring,
            recurrence
        },
        {
            new: true,
            runValidators: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedReminder,
                "Reminder updated successfully"
            )
        );
});


// delete reminder

export const deleteReminder = asyncHandler(async (req, res) => {

    const { reminderId } = req.params;

    if (!isValidObjectId(reminderId)) {
        throw new apiError(400, "Invalid reminder ID");
    }

    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
        throw new apiError(404, "Reminder not found");
    }

    const petData = await Pet.findById(reminder.pet);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not authorized to delete this reminder"
        );
    }

    await Reminder.findByIdAndDelete(reminderId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Reminder deleted successfully"
            )
        );
});