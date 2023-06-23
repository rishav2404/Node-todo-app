import express from 'express'
import { User } from '../models/user.js'
import { getAllUsers, register, getMyProfile,login,logout } from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get("/all", getAllUsers)

router.post("/new", register)
router.post("/login", login)
router.get("/logout", logout)


// router
//     .route("/userid/:id")
//     .get(getMyProfile)

router.get("/me",isAuthenticated,getMyProfile)


export default router