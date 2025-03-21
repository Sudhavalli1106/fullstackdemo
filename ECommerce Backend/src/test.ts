import express from "express";
import pool from "./config/db"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test-db", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT 1 + 1 AS result");
    connection.release();
    res.json({ message: "Database Connected!", result: rows });
  } catch (error) {
    console.error("Database Connection Error:", error);
    res.status(500).json({ error: "Database Connection Failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
