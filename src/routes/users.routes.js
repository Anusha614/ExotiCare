
import { Router } from "express";
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/", verifyJWT, getAllUsers);
router.get("/:id", verifyJWT, getUserById);
router.patch("/:id", verifyJWT, updateUserById);
router.delete("/:id", verifyJWT, deleteUserById);

export default router;
