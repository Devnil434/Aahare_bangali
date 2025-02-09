import {
  type MenuItem,
  type InsertMenuItem,
  type Reservation,
  type InsertReservation,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";

export interface IStorage {
  // Menu items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  
  // Reservations
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getReservation(id: number): Promise<Reservation | undefined>;
  
  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<number, MenuItem>;
  private reservations: Map<number, Reservation>;
  private contactMessages: Map<number, ContactMessage>;
  private currentMenuId: number = 1;
  private currentReservationId: number = 1;
  private currentMessageId: number = 1;

  constructor() {
    this.menuItems = new Map();
    this.reservations = new Map();
    this.contactMessages = new Map();
    this.initializeMenuItems();
  }

  private initializeMenuItems() {
    const items: InsertMenuItem[] = [
      {
        name: "Classic Burger",
        description: "Juicy beef patty with fresh lettuce and tomato",
        price: 1499,
        category: "main",
        imageUrl: "https://images.unsplash.com/photo-1564844536311-de546a28c87d",
      },
      {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with parmesan and croutons",
        price: 999,
        category: "starters",
        imageUrl: "https://images.unsplash.com/photo-1503767849114-976b67568b02",
      },
      // Add more sample menu items as needed
    ];

    items.forEach(item => this.createMenuItem(item));
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.category === category
    );
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const id = this.currentMenuId++;
    const menuItem = { ...item, id };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const id = this.currentReservationId++;
    const newReservation = { ...reservation, id, status: "pending" };
    this.reservations.set(id, newReservation);
    return newReservation;
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const newMessage = { ...message, id, createdAt: new Date() };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
