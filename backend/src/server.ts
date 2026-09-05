import express from "express";
import dotenv from "dotenv"
import healthRoutes from "./routes/health.routes.js"
import authRoutes from "./routes/auth.routes.js"
import {errorHandler} from "./middleware/error.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);


app.use(errorHandler);



app.listen(PORT, ()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
});