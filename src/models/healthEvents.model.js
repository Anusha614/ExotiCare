import mongoose, { Schema } from "mongoose";

const healthEventSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true
    },

    type: {
      type: String,
      enum: [
        "checkup",
        "illness",
        "injury",
        "medication",
        "vaccination",
        "vet_visit",
        "treatment",
        "other"
      ],
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: String,

    date: {
      type: Date,
      default: Date.now
    },

    vetName: String,

    medication: String,

    attachment: String
  },
  { timestamps: true }
)

export const HealthEvent = mongoose.model("HealthEvent", healthEventSchema)