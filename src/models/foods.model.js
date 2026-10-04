import mongoose, {Schema} from "mongoose"

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: [
        "fruit",
        "vegetable",
        "protein",
        "pellet",
        "seed",
        "insect",
        "treat",
        "other"
      ]
    },

    speciesRules: [
      {
        species: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Species"
        },

        status: {
          type: String,
          enum: ["safe", "limited", "unsafe"]
        },

        reason: String
      }
    ],

    notes: String
  },
  { timestamps: true }
)

export const Food = mongoose.model("Food", foodSchema)