import mongoose from "mongoose"



const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select: false,  // it means on selection the user ,password will not be accessed......you have to do it manually(alag se krna pdedga)
        required: true,
    },
    createdAt :{
        type: Date,
        default:Date.now,
    }
})

export const User = mongoose.model("User", schema)