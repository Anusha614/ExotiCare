import { isValidObjectId } from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Food } from "../models/foods.model.js";
import { Species } from "../models/species.model.js";


// get all foods

export const getAllFoods = asyncHandler(async (req, res) => {

    const foods = await Food.find();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                foods,
                "Foods fetched successfully"
            )
        );
});


// get food by id

export const getFoodById = asyncHandler(async (req, res) => {

    const { foodId } = req.params;

    if (!isValidObjectId(foodId)) {
        throw new ApiError(400, "Invalid food ID");
    }

    const food = await Food.findById(foodId);

    if (!food) {
        throw new ApiError("Food not found", 404 );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                food,
                "Food fetched successfully"
            )
        );
});


// get foods by species

export const getFoodsBySpecies = asyncHandler(async (req, res) => {

    const { speciesId } = req.params;

    if (!isValidObjectId(speciesId)) {
        throw new ApiError(400, "Invalid species ID");
    }

    const species = await Species.findById(speciesId);

    if (!species) {
        throw new ApiError(404, "Species not found");
    }

    const foods = await Food.find({
        "speciesRules.species": speciesId
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                foods,
                "Foods for species fetched successfully"
            )
        );
});


// search foods

export const searchFoods = asyncHandler(async (req, res) => {

    const { search } = req.query;

    if (!search) {
        throw new ApiError(400, "Search query is required");
    }

    const foods = await Food.find({
        name: {
            $regex: search,
            $options: "i"
        }
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                foods,
                "Foods searched successfully"
            )
        );
});