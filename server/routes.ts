import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertOrderSchema, insertCategorySchema, insertUserSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(null, ext && mime);
  },
  limits: { fileSize: 10 * 1024 * 1024 }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Products Routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Orders Routes
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Failed to update order status" });
    }
  });

  // Settings Routes
  app.get("/api/settings", async (req, res) => {
    try {
      const allSettings = await storage.getSettings();
      const settingsObj: Record<string, string> = {};
      allSettings.forEach(s => { settingsObj[s.key] = s.value; });
      res.json(settingsObj);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const { key, value } = req.body;
      const setting = await storage.upsertSetting(key, value);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: "Failed to save setting" });
    }
  });

  // Categories Routes
  app.get("/api/categories", async (req, res) => {
    try {
      const cats = await storage.getCategories();
      res.json(cats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: "Invalid category data" });
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    try {
      await storage.deleteCategory(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // Upload Route
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });

  // Serve uploads
  app.use("/uploads", (await import("express")).static(uploadDir));

  // Auth Routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      let user = await storage.getFirstUser();
      
      if (!user) {
        user = await storage.createUser({ username: "paudronixGt123@", password: "paudronix123GT%" });
      }
      
      if (user.username === username && user.password === password) {
        res.json({ success: true, user: { id: user.id, username: user.username } });
      } else {
        res.status(401).json({ success: false, error: "Credenciales incorrectas" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error de autenticación" });
    }
  });

  app.get("/api/auth/credentials", async (req, res) => {
    try {
      let user = await storage.getFirstUser();
      if (!user) {
        user = await storage.createUser({ username: "paudronixGt123@", password: "paudronix123GT%" });
      }
      res.json({ username: user.username });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener credenciales" });
    }
  });

  app.post("/api/auth/update", async (req, res) => {
    try {
      const { currentPassword, newUsername, newPassword } = req.body;
      let user = await storage.getFirstUser();
      
      if (!user) {
        user = await storage.createUser({ username: "paudronixGt123@", password: "paudronix123GT%" });
      }
      
      if (user.password !== currentPassword) {
        return res.status(401).json({ error: "Contraseña actual incorrecta" });
      }
      
      const updateData: any = {};
      if (newUsername) updateData.username = newUsername;
      if (newPassword) updateData.password = newPassword;
      
      const updated = await storage.updateUser(user.id, updateData);
      res.json({ success: true, username: updated?.username });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar credenciales" });
    }
  });

  return httpServer;
}
