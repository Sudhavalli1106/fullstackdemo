"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
// Use correct function references
router.get("/products", (req, res) => (0, product_controller_1.getAllProducts)(req, res));
router.get("/products/:id", (req, res) => (0, product_controller_1.getProductById)(req, res));
router.post("/products", (req, res) => (0, product_controller_1.addProduct)(req, res));
router.put("/products/:id", (req, res) => (0, product_controller_1.updateProduct)(req, res));
router.delete("/products/:id", (req, res) => (0, product_controller_1.deleteProduct)(req, res));
//router.get("/products/category/:categoryName", getProductsByCategory);
router.get("/category", product_controller_1.getCategory);
exports.default = router;
