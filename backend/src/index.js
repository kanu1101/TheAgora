import express from "express"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
const app = express();

app.use("/api/auth", authRoutes);

app.listen(5001, () => {
    console.log("server is running");  
    connectDB();
})