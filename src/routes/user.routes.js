import { Router } from "express";
import { registerUser, show } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route("/show").get(show)
router.route("/register").post(upload.single("avatar"), registerUser)

export default router