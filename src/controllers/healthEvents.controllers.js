import  { isValidObjectId } from "mongoose";
import asyncHandler from "express-async-handler";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import HealthEvent from "../models/healthEvents.model.js";
import { Pet } from "../models/pets.model.js";


export const createHealthEvent = asyncHandler(async (req, res) => {
    const {
        pet,
        type,
        title,
        description,
        date,
        vetName,
        medication,
        attachment
    } = req.body;

    if (!pet || !type || !title) {
        throw new apiError(
            400,
            "Pet, type, and title are required fields"
        );
    }

    const petData = await Pet.findById(pet);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not authorized to add a health event for this pet"
        );
    }

    const healthEvent = await HealthEvent.create({
        pet,
        type,
        title,
        description,
        date,
        vetName,
        medication,
        attachment
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                healthEvent,
                "Health event created successfully"
            )
        );
});



export const getHealthEvents = asyncHandler(async (req, res) => {
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
            "You are not authorized to view health events for this pet"
        );
    }

    const healthEvents = await HealthEvent
        .find({ pet: petId })
        .sort({ date: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                healthEvents,
                "Health events retrieved successfully"
            )
        );
});



export const updateHealthEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const {
        type,
        title,
        description,
        date,
        vetName,
        medication,
        attachment
    } = req.body;

    if (!isValidObjectId(eventId)) {
        throw new apiError(400, "Invalid health event ID");
    }

    const healthEvent = await HealthEvent.findById(eventId);

    if (!healthEvent) {
        throw new apiError(404, "Health event not found");
    }

    const petData = await Pet.findById(healthEvent.pet);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not authorized to update this health event"
        );
    }

    const updatedHealthEvent = await HealthEvent.findByIdAndUpdate(
        eventId,
        {
            type,
            title,
            description,
            date,
            vetName,
            medication,
            attachment
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
                updatedHealthEvent,
                "Health event updated successfully"
            )
        );
});



export const deleteHealthEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    if (!isValidObjectId(eventId)) {
        throw new apiError(400, "Invalid health event ID");
    }

    const healthEvent = await HealthEvent.findById(eventId);

    if (!healthEvent) {
        throw new apiError(404, "Health event not found");
    }

    const petData = await Pet.findById(healthEvent.pet);

    if (!petData) {
        throw new apiError(404, "Pet not found");
    }

    if (petData.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not authorized to delete this health event"
        );
    }

    await HealthEvent.findByIdAndDelete(eventId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Health event deleted successfully"
            )
        );
});