import { Router } from "express";
import { getAllSpecies,
    getSpeciesById,
    searchSpecies,
    getSpeciesByCategory
 } from "../controllers/species.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";


 const router = Router()

 router.use(verifyJWT)

    router.route("/").get(getAllSpecies)
    router.route("/:speciesId").get(getSpeciesById)
    router.route("/search").get(searchSpecies)
    router.route("/category/:category").get(getSpeciesByCategory)

 export default router