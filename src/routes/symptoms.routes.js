import { Router } from "express";
import { getAllSymptoms,
    getSymptomById,
    searchSymptoms,
    getSymptomsBySpecies
 } from "../controllers/symptoms.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";


 const router = Router()

 router.use(verifyJWT)

    router.route("/").get(getAllSymptoms)
    router.route("/:symptomId").get(getSymptomById)
    router.route("/search").get(searchSymptoms)
    router.route("/species/:speciesId").get(getSymptomsBySpecies)

 export default router