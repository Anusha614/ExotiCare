import connectDB from "../db/index.js"; 
import {Species} from "../models/species.model.js";
import speciesData from "../data/species.seed.json" with { type: "json" };
import "dotenv/config";

const seedSpecies = async () => {
    try {
        await connectDB();

        await Species.deleteMany();

        await Species.insertMany(speciesData);

        console.log(`${speciesData.length} species seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding species:", error);
        process.exit(1);
    }
};

seedSpecies();