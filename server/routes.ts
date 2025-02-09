import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReservationSchema, insertContactMessageSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Menu routes
  app.get("/api/menu", async (_req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  app.get("/api/menu/:category", async (req, res) => {
    const items = await storage.getMenuItemsByCategory(req.params.category);
    res.json(items);
  });

  // Reservation routes
  app.post("/api/reservations", async (req, res) => {
    try {
      const reservation = insertReservationSchema.parse(req.body);
      const created = await storage.createReservation(reservation);
      res.json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid reservation data" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const message = insertContactMessageSchema.parse(req.body);
      const created = await storage.createContactMessage(message);
      res.json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact message data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
