import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'

const options = {
    httpOnly: true,
    secure: true
}

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
            console.log("avatarlocalpath is undefined")
            res
                .json({
                    message: "Registration unsuccessfull due error in avatar upload",
                    data: {}
                })
                .status(400)
            return
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        // console.log(avatar);
        const user = await User.create({
            name,
            email,
            password,
            avatar: avatar.url
        })

        const token = await user.generateAuthToken()


        if (!user) {
            res
                .json({
                    message: "Registration unsuccessfull",
                    data: {}
                })
                .status(400)

            return
        }
        else {
            res.cookie("token", token)
            res.json({
                message: "Registration Successfull",
                data: user,
                token: token
            })
                .status(200)
            return

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

const getUserById = async (req, res) => {
    try {
        const { id } = req.body
        const user = await User.findById(id)
        if (!user)
            return res
                .status(400)
                .json({
                    message: "User Not Found"
                })

        return res
            .status(200)
            .json({
                name: user.name,
                email: user.email,
                avatar: user.avatar
            })

    } catch (error) {
        console.log("Error in getUserById", error);
    }
}

const getUserFromToken = async (req, res) => {
    try {
        // const { token } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res
                .status(200)
                .json({
                    message: "Token is empty"
                })
        }
        let user;
        let failed = false
        await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log('Error decoding token:', err);
                failed = true;

            } else {
                console.log('Decoded token:', decoded);
                user = decoded
            }
        })
        if (failed) {
            return res
                .status(400)
                .json({
                    message: "Error occured while decoding",
                    payload: {}
                })
        }
        else {

            return res
                .status(200)
                .json({
                    message: "token decoded succesfully",
                    payload: user
                })
        }
    } catch (error) {
        console.log("Error occured while ", error);

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res
                .status(400)
                .json({
                    message: "email/password is empty"
                })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({
                    message: "User not found"
                })
        }
        console.log(user);
        if (user.password === password) {
            const token = await user.generateAuthToken()
            return res
                .status(200)
                .json({
                    token: token
                })
        }
        else {
            return res
                .status(400)
                .json({
                    message: "Invalid credentials"
                })
        }

    } catch (error) {
        console.log("Error in loginUser", error);
    }
}

export { show, registerUser, getUserById, getUserFromToken, loginUser }