import { isValidObjectId } from "mongoose";
import asyncHandler from "express-async-handler";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Symptom } from "../models/symptom.model.js";
import { Species } from "../models/species.model.js";

// get all symptoms
export const getAllSymptoms = asyncHandler(async (req, res) => {
    const symptoms = await Symptom.find();

    return res
        .status(200)
        .json(new ApiResponse(200, symptoms, "Symptoms fetched successfully"));
});


// get symptom by id
export const getSymptomById = asyncHandler(async (req, res) => {
    const { symptomId } = req.params;

    if (!isValidObjectId(symptomId)) {
        throw new apiError(400, "Invalid symptom ID");
    }

    const symptom = await Symptom.findById(symptomId);

    if (!symptom) {
        throw new apiError(404, "Symptom not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, symptom, "Symptom fetched successfully"));
});


// search symptoms
export const searchSymptoms = asyncHandler(async (req, res) => {
    const { search } = req.query;

    if (!search) {
        throw new apiError(400, "Search query is required");
    }

    const symptoms = await Symptom.find({
        name: { $regex: search, $options: "i" }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, symptoms, "Symptoms searched successfully"));
});


// get symptoms by species
export const getSymptomsBySpecies = asyncHandler(async (req, res) => {
    const { speciesId } = req.params;

    if (!isValidObjectId(speciesId)) {
        throw new apiError(400, "Invalid species ID");
    }

    const species = await Species.findById(speciesId);

    if (!species) {
        throw new apiError(404, "Species not found");
    }

    const symptoms = await Symptom.find({
        species: speciesId
    });

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            symptoms,
            "Symptoms for species fetched successfully"
        ));
});