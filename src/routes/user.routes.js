import { Router } from "express";
import { registerUser, show } from "../controllers/user.controller.js"

const router = Router()

router.route("/show").get(show)
router.route("/register").post(registerUser)

export default router