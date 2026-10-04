import connectDB from "../db/index.js"; 
import {Food} from "../models/foods.model.js";
import foodData from "../data/foods.seed.json" with { type: "json" };
import "dotenv/config";

const seedFoods = async () => {
    try {
        await connectDB();

        await Food.deleteMany();

        await Food.insertMany(foodData);

        console.log(`${foodData.length} foods seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding foods:", error);
        process.exit(1);
    }
};

seedFoods();