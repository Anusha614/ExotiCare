import { Router } from "express";
import { getAllFoods,
    getFoodById,
    getFoodsBySpecies,
    searchFoods
 } from "../controllers/foods.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";


 const router = Router()

 router.use(verifyJWT)

 router.route("/").get(getAllFoods)
  router.route("/search").get(searchFoods)
 router.route("/:foodId").get(getFoodById)
 router.route("/species/:speciesId").get(getFoodsBySpecies)


 export default router