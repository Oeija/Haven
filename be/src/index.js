import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {app,server} from "./lib/socket.js";

import path from "path";

dotenv.config()

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../fe/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../fe", "dist", "index.html"));
    })
}


server.listen(PORT, () =>{
    console.log("Server is running on PORT:" + PORT);
    connectDB();
})