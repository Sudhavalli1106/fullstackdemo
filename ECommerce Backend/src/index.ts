import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import cors from 'cors'
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());
// Use product routes
app.use("/api", productRoutes);
console.log(process.env.PORTNO)

const PORT = process.env.PORTNO || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
