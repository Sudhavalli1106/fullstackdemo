import { Request, Response } from "express";
import { RowDataPacket, OkPacket } from "mysql2";
import db from "../config/db"; // Ensure this points to your MySQL connection

// Fetch all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await db.execute("SELECT * FROM products");
  //  console.log(rows)
debugger;
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Fetch a single product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.params.id)
    const [rows] = await db.execute("SELECT * FROM products WHERE product_id = ?", [
      req.params.id,
    ]);
    const products = rows as RowDataPacket[]; // Explicitly cast

    if (products.length === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(products[0]);
    console.log(products[0])
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Add a new product
export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, description } = req.body;
    const [result] = await db.execute(
      "INSERT INTO products (product_name, product_price, product_description) VALUES (?, ?, ?)",
      [name, price, description]
    );
    const insertResult = result as OkPacket; // Explicitly cast

    if (insertResult.affectedRows > 0) {
      res
        .status(201)
        .json({
          message: "Product added successfully",
          productId: insertResult.insertId,
        });
    } else {
      res.status(500).json({ message: "Failed to insert product" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update a product by ID
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("inside update product")
    const { name, price } = req.body;
    const { id } = req.params;
    console.log(
      "UPDATE products SET product_name = ?, product_price = ? WHERE product_id = ?",
      [name, parseInt(price), id]
    );
    const [result] = await db.execute(
      "UPDATE products SET product_name = ?, product_price = ?  WHERE product_id = ?",
      [name, parseInt(price), id]
    );
    
    const updateResult = result as OkPacket; // Explicitly cast

    if (updateResult.affectedRows === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product by ID
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM products WHERE product_id = ?", [
      id,
    ]);
    const deleteResult = result as OkPacket; // Explicitly cast

    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Fetch Products by Category
export const getCategory = async (req: Request, res: Response) => {
 // const { categoryName } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM categories");
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category", error });
  }
};