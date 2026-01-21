import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import quizzRoutes from "./routes/QuizzRoutes.js";
import openaiRoutes from "./routes/OpenAIRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api", quizzRoutes);
app.use("/api", openaiRoutes);
