import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

// Explicitly specify the path to .env
dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
