import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const connectDB=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log(("connected to DB"))
    } catch (error) {
       console.log(error) 
    }
}