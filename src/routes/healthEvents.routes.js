import { Router } from "express";
import { createHealthEvent,
    getHealthEvents,
    updateHealthEvent,
    deleteHealthEvent
 } from "../controllers/healthEvents.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";


 const router = Router()

 router.use(verifyJWT)

 router.route("/").post(createHealthEvent).get(getHealthEvents)
 router.route("/:healthEventId").patch(updateHealthEvent).delete(deleteHealthEvent)
 
 export default router