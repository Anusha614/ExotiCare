import mongoose, { Schema } from 'mongoose';

const symptomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: String,

    severity: {
      type: String,
      enum: ["mild", "moderate", "severe", "emergency"]
    },

    firstAid: String,

    whenToSeeVet: String,

    species: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Species"
      }
    ]
  },
  { timestamps: true }
)

export const Symptom = mongoose.model("Symptom", symptomSchema)