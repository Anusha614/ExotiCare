import connectDB from "../db/index.js"; 
import {Symptom} from "../models/symptoms.model.js";
import symptomData from "../data/symptoms.seed.json" with { type: "json" };
import "dotenv/config";

const seedSymptoms = async () => {
    try {
        await connectDB();

        await Symptom.deleteMany();

        await Symptom.insertMany(symptomData);

        console.log(`${symptomData.length} symptoms seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding symptoms:", error);
        process.exit(1);
    }
};

seedSymptoms();