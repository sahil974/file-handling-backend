import { Router } from "express";
import { getUserById, getUserFromToken, registerUser, show, loginUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route("/show").get(show)
router.route("/register").post(upload.single("avatar"), registerUser)
router.route("/getUserById").get(getUserById)
router.route("/getuserByToken").get(getUserFromToken)
router.route("/login").post(loginUser)


export default router