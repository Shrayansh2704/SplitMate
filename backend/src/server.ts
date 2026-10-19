import express from "express";
import dotenv from "dotenv"
import healthRoutes from "./routes/health.routes.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import {errorHandler} from "./middleware/error.middleware.js";
import friendRoutes from "./routes/friend.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);


app.use(errorHandler);



app.listen(PORT, ()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
});