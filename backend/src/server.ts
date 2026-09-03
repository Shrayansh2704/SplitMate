import express from "express";
import dotenv from "dotenv"
import healthRoutes from "./routes/health.routes.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api/health", healthRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
});