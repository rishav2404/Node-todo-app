import {app} from './app.js'
import { connectDB } from "./data/database.js"

connectDB()

app.listen(process.env.PORT,() => {
    console.log(`Server is working, listening on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`)
});