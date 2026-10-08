import { Router } from "express";
import { addPet,
    getPetsofUser,
    getPetById,
    updatePet,
    deletePet
 } from "../controllers/pets.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";


 const router = Router()

 router.use(verifyJWT)

router.route("/").post(addPet)
router.route("/user/:userId").get(getPetsofUser)
router.route("/:petId").get(getPetById).patch(updatePet).delete(deletePet)
 
 export default router