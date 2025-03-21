"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProductById = exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../config/db")); // Ensure this points to your MySQL connection
// Fetch all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.execute("SELECT * FROM products");
        //  console.log(rows)
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});
exports.getAllProducts = getAllProducts;
// Fetch a single product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const [rows] = yield db_1.default.execute("SELECT * FROM products WHERE product_id = ?", [
            req.params.id,
        ]);
        const products = rows; // Explicitly cast
        if (products.length === 0) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(products[0]);
        console.log(products[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
});
exports.getProductById = getProductById;
// Add a new product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description } = req.body;
        const [result] = yield db_1.default.execute("INSERT INTO products (product_name, product_price, product_description) VALUES (?, ?, ?)", [name, price, description]);
        const insertResult = result; // Explicitly cast
        if (insertResult.affectedRows > 0) {
            res
                .status(201)
                .json({
                message: "Product added successfully",
                productId: insertResult.insertId,
            });
        }
        else {
            res.status(500).json({ message: "Failed to insert product" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
});
exports.addProduct = addProduct;
// Update a product by ID
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inside update product");
        const { name, price } = req.body;
        const { id } = req.params;
        console.log("UPDATE products SET product_name = ?, product_price = ? WHERE product_id = ?", [name, parseInt(price), id]);
        const [result] = yield db_1.default.execute("UPDATE products SET product_name = ?, product_price = ?  WHERE product_id = ?", [name, parseInt(price), id]);
        const updateResult = result; // Explicitly cast
        if (updateResult.affectedRows === 0) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json({ message: "Product updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
});
exports.updateProduct = updateProduct;
// Delete a product by ID
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.execute("DELETE FROM products WHERE product_id = ?", [
            id,
        ]);
        const deleteResult = result; // Explicitly cast
        if (deleteResult.affectedRows === 0) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});
exports.deleteProduct = deleteProduct;
// Fetch Products by Category
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { categoryName } = req.params;
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM categories");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products by category", error });
    }
});
exports.getCategory = getCategory;
