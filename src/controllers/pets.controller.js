import mongoose, {isValidObjectId} from "mongoose";
import { Pet } from "../models/pets.model.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {apiError} from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

//creeate ne pet

export const addPet = asyncHandler(async (req, res)=> {
    //request name, species, breed, sex, dateOfBirth, adoptionDate, weight, notes from body
    const { name, species, breed, sex, dateOfBirth, adoptionDate, weight, notes } = req.body;

    //base cases if any required field is missing
    if (!name || !species) {
        throw new apiError(400, "Name and species are required");
    }

    //create new pet
    const newPet = await Pet.create({
        name,
        species,
        breed,
        sex,
        dateOfBirth,
        adoptionDate,
        weight,
        notes,
        owner: req.user._id
    })

    //return res
    return res
    .status(201)
    .json(new ApiResponse(201, newPet, "Pet added successfully!"))
})

//get all pets of a user
export const getPetsofUser = asyncHandler(async (req, res)=> {

    //req user id from params
    const {userId} = req.params;

    //base case to verify if user id is valid
    if (!isValidObjectId(userId)) {
        throw new apiError(400, "Invalid user id");
    }
    //aggregate to get all pets of a user
    const userPets = await Pet.find({ owner: userId })

    //base case to verify if user has any pets
    if (!userPets) {
        throw new apiError(404, "No pets found for this user");
    }

    //return res
    return res
    .status(200)
    .json(new ApiResponse(200, userPets, "Pets fetched successfully!"))
})

//get pet by id
export const getPetById = asyncHandler(async (req, res)=> {
    //req pet id from params
    const {petId} = req.params;

    //base case to verify if pet id is valid
    if (!isValidObjectId(petId)) {
        throw new apiError(400, "Invalid pet id");
    }
    //agregate

    const pet = await Pet.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(petId)
            }
        },
        {
            $lookup: {
                from: "species",
                localField: "species",
                foreignField: "_id",
                as: "species"
            }
        },
        {
            $unwind: "$species"
        }
    ])
    //base case to verify if pet exists
    if (pet.length ===0) {
        throw new apiError(404, "Pet not found");
    }
    //return res
    return res
    .status(200)
    .json(new ApiResponse(200, pet, "Pet fetched successfully!"))
})

//update pate

export const updatePet = asyncHandler(async (req, res)=> {
    const {name, species, breed, sex, dateOfBirth, adoptionDate, weight, notes} = req.body;
    const {petId} = req.params;

    if (!isValidObjectId(petId)) {
        throw new apiError(400, "Invalid pet id");
    }

    if (!name || !species) {
        throw new apiError(400, "Name and species are required");
    }

    const pet = await Pet.findById(petId);

    if (!pet) {
        throw new apiError(404, "Pet not found");
    }

    if (pet.owner.toString() !== req.user._id.toString()) {
        throw new apiError(403, "You are not authorized to update this pet");
    }

   const updatedPet = await Pet.findByIdAndUpdate(
        petId,
        {
            name,
            species,
            breed,
            sex,
            dateOfBirth,
            adoptionDate,
            weight,
            notes
        },
        {
            new: true,
            runValidators: true
        }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, updatedPet, "Pet updated successfully!"));
})

//delete pet

export const deletePet = asyncHandler(async (req, res)=> {
    const {petId} = req.params;

    if (!isValidObjectId(petId)) {
        throw new apiError(400, "Invalid pet id");
    }

    const pet = await Pet.findById(petId);

    if (!pet) {
        throw new apiError(404, "Pet not found");
    }

    if (pet.owner.toString() !== req.user._id.toString()) {
        throw new apiError(403, "You are not authorized to delete this pet");
    }

    await Pet.findByIdAndDelete(petId);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Pet deleted successfully!"));
})