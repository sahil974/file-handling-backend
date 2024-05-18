import { User } from "../model/user.model.js";

const show = (req, res, next) => {
    res.send("sahil")
}

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        console.log(req.body);

        const user = await User.create({
            name,
            email,
            password
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
    }

}

export { show, registerUser }