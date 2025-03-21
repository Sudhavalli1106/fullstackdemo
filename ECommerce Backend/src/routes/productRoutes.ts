import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  //getProductsByCategory,
  getCategory,
} from "../controllers/product.controller";

const router = Router();

// Use correct function references
router.get("/products", (req, res) => getAllProducts(req, res));
router.get("/products/:id", (req, res) => getProductById(req, res));
router.post("/products", (req, res) => addProduct(req, res));
router.put("/products/:id", (req, res) => updateProduct(req, res));
router.delete("/products/:id", (req, res) => deleteProduct(req, res));
//router.get("/products/category/:categoryName", getProductsByCategory);
router.get("/category", getCategory);
export default router;
