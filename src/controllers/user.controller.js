import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const show = (req, res, next) => {
    res.send("sahil")
}

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // console.log(req.body);
        // console.log(req.file)
        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            console.log("avatarlocalpath is undefined");
            return res
                .json({
                    message: "Registration unsuccessfull due error in avatar upload",
                    data: {}
                })
                .status(400)
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        // console.log(avatar);
        const user = await User.create({
            name,
            email,
            password,
            avatar: avatar.url
        })


        if (!user) {
            return res
                .json({
                    message: "Registration unsuccessfull",
                    data: {}
                })
                .status(400)
        }
        else {
            return res
                .json({
                    message: "Registration Successfull",
                    data: user
                })
                .status(200)
        }

    } catch (error) {
        console.log("error in registerUser controller", error);
        return res
            .json({
                message: "Registration unsuccessfull",
                data: {}
            })
            .status(400)
    }

}

export { show, registerUser }