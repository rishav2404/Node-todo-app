import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"
import { ErrorHandler } from "../middlewares/error.js"


export const getAllUsers = async (req, res) => {

}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        let user = await User.findOne({ email })

        if (user) return next(new ErrorHandler("User already exists!", 404))

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashedPassword })

        sendCookie(user, res, "Registered Successfully!", 201)

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select("+password")  // " .select("+password") " fro accessing password which was set false before

        if (!user) return next(new ErrorHandler("Invalid email or password!", 400))


        console.log("Here")
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return next(new ErrorHandler("Incorrect password!", 404))

        sendCookie(user, res, `Welcome back ${user.name}`, 200)

    } catch (error) {
        next(error)
    }

}

export const getMyProfile = (req, res) => {   // "":id" here is a dynamic url
    res.status(200).json({
        success: true,
        user: req.user,
    })

}

export const logout = (req, res) => {   // "":id" here is a dynamic url
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
            success: true,
            user: req.user,
        })

}


