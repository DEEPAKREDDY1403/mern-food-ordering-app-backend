import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { Response,Request } from "express";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then (()=> console.log("connected to database!"));
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req:Request, res: Response)=>{
    res.send({message: "health OK!"});
})
app.use("/api/my/user", myUserRoute);


app.listen(4000,()=>{
    console.log("server started on localhost:4000");
});