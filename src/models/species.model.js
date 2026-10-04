import mongoose, {Schema} from 'mongoose';

const speciesSchema = new mongoose.Schema(
  {
    commonName: {
      type: String,
      required: true,
      trim: true
    },

    scientificName: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      enum: [
        "reptile",
        "amphibian",
        "bird",
        "mammal",
        "fish",
        "invertebrate"
      ],
      required: true
    },

    description: String,

    lifespan: {
      min: Number,
      max: Number
    },

    size: {
      min: Number,
      max: Number,
      unit: String
    },

    habitat: {
      enclosureType: String,

      temperature: {
        min: Number,
        max: Number,
        unit: String
      },

      humidity: {
        min: Number,
        max: Number,
        unit: String
      },

      uvbRequired: Boolean,

      lighting: String
    },

    diet: {
    type: {
        type: String,
        enum: [
            "carnivore",
            "herbivore",
            "omnivore",
            "insectivore",
            "piscivore"
        ]
    },

    description: {
        type: String
    }
},

    careDifficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"]
    },

    notes: String
  },
  { timestamps: true }
)

export const Species = mongoose.model("Species", speciesSchema)