import mongoose, { Schema } from 'mongoose';

const petSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },

    species: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Species",
      required: true
    },

    breed: {
      type: String,
      default: ""
    },

    sex: {
      type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown"
    },

    dateOfBirth: {
      type: Date
    },

    adoptionDate: {
      type: Date
    },

    weight: {
      type: Number
    },

    profilePicture: {
      type: String,
      default: ""
    },

    notes: {
      type: String,
      maxlength: 500,
      default: ""
    }
  },
  { timestamps: true }
)

export const Pet = mongoose.model("Pet", petSchema)