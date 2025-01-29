import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { Response,Request } from "express";
import {v2 as cloudinary} from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then (()=> console.log("connected to database!"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req:Request, res: Response)=>{
    res.send({message: "health OK!"});
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);

app.listen(4000,()=>{
    console.log("server started on localhost:4000");
});