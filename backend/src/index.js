import express from "express"
import authRoutes from "./routes/auth.route.js"
import blogRoutes from "./routes/blog.route.js"
import debateRoutes from "./routes/debate.route.js"
import { connectDB } from "./lib/db.js";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/debate", debateRoutes);


app.listen(5001, () => {
    console.log("server is running");  
    connectDB();
})