import { Router } from "express";
import { createReminder,
    getMyReminders,
    getPetReminders,
    getReminderById,
    updateReminder,
    deleteReminder
 } from "../controllers/reminder.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";


 const router = Router()

 router.use(verifyJWT)

router.route("/").post(createReminder)
router.route("/my").get(getMyReminders)
router.route("/pet/:petId").get(getPetReminders)
router.route("/:reminderId").get(getReminderById).patch(updateReminder).delete(deleteReminder)

 export default router