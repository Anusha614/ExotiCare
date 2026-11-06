
import connectDB from "../db/index.js";
import { Food } from "../models/foods.model.js";
import { Species } from "../models/species.model.js";
import foodData from "../data/foods.seed.json" with { type: "json" };
import "dotenv/config";

const seedFoods = async () => {
    try {
        await connectDB();

        // Fetch species from MongoDB
        const speciesList = await Species.find();

        // Map species commonName to MongoDB ObjectId
        const speciesMap = new Map(
            speciesList.map(species => [
                species.commonName,
                species._id
            ])
        );

        // Convert speciesName into species ObjectId
        const formattedFoods = foodData.map(food => ({
            ...food,
            speciesRules: food.speciesRules.map(rule => {
                const speciesId = speciesMap.get(rule.speciesName);

                if (!speciesId) {
                    throw new Error(
                        `Species not found: ${rule.speciesName} in ${food.name}`
                    );
                }

                return {
                    species: speciesId,
                    status: rule.status,
                    reason: rule.reason
                };
            })
        }));

        // Only delete existing foods after all mappings succeed
        await Food.deleteMany({});
        await Food.insertMany(formattedFoods);

        console.log(`${formattedFoods.length} foods seeded successfully`);

        process.exit(0);

    } catch (error) {
        console.error("Error seeding foods:", error);
        process.exit(1);
    }
};

seedFoods();
