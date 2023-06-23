
import mongoose from "mongoose"


export const connectDB = ()=>{
    mongoose
    .connect(process.env.MONGO_URI,{
        dbName: "backendApi"
    })
    .then((c)=>{console.log(`Database connected with ${c.connection.host}`)})
    .catch((e)=>{console.log(e)})
}