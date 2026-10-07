import { isValidObjectId } from "mongoose";
import asyncHandler from "express-async-handler";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Species } from "../models/species.model.js";

// get all species
export const getAllSpecies = asyncHandler(async (req, res) => {
    const species = await Species.find();

    return res
        .status(200)
        .json(new ApiResponse(200, species, "Species fetched successfully"));
});


// get species by id
export const getSpeciesById = asyncHandler(async (req, res) => {
    const { speciesId } = req.params;

    if (!isValidObjectId(speciesId)) {
        throw new apiError(400, "Invalid species ID");
    }

    const species = await Species.findById(speciesId);

    if (!species) {
        throw new apiError(404, "Species not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, species, "Species fetched successfully"));
});


// search species
export const searchSpecies = asyncHandler(async (req, res) => {
    const { search } = req.query;

    if (!search) {
        throw new apiError(400, "Search query is required");
    }

    const species = await Species.find({
        $or: [
            { commonName: { $regex: search, $options: "i" } },
            { scientificName: { $regex: search, $options: "i" } }
        ]
    });

    return res
        .status(200)
        .json(new ApiResponse(200, species, "Species searched successfully"));
});


// get species by category
export const getSpeciesByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    const validCategories = [
        "reptile",
        "amphibian",
        "bird",
        "mammal",
        "fish",
        "invertebrate"
    ];

    if (!validCategories.includes(category.toLowerCase())) {
        throw new apiError(400, "Invalid species category");
    }

    const species = await Species.find({
        category: category.toLowerCase()
    });

    return res
        .status(200)
        .json(new ApiResponse(200, species, "Species filtered successfully"));
});