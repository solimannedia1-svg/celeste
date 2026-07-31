import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { INITIAL_MENU_ITEMS, CATEGORIES, DEFAULT_RESTAURANT_INFO } from "./src/data.ts";

const app = express();
const PORT = 3000;
const STORE_PATH = path.join(process.cwd(), "data-store.json");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Load / initialize state
function loadState() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        menuItems: parsed.menuItems || INITIAL_MENU_ITEMS,
        categories: parsed.categories || CATEGORIES,
        orders: parsed.orders || [],
        reservations: parsed.reservations || [],
        users: parsed.users || [],
        restaurantInfo: parsed.restaurantInfo || DEFAULT_RESTAURANT_INFO
      };
    }
  } catch (err) {
    console.error("Error loading state from data-store.json, using defaults:", err);
  }
  return {
    menuItems: INITIAL_MENU_ITEMS,
    categories: CATEGORIES,
    orders: [],
    reservations: [],
    users: [],
    restaurantInfo: DEFAULT_RESTAURANT_INFO
  };
}

let currentState = loadState();

function saveState(state: typeof currentState) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving state to data-store.json:", err);
  }
}

// API Routes
app.get("/api/state", (req, res) => {
  res.json(currentState);
});

app.post("/api/state", (req, res) => {
  const { menuItems, categories, orders, reservations, users, restaurantInfo } = req.body;
  if (menuItems) currentState.menuItems = menuItems;
  if (categories) currentState.categories = categories;
  if (orders) currentState.orders = orders;
  if (reservations) currentState.reservations = reservations;
  if (users) currentState.users = users;
  if (restaurantInfo) currentState.restaurantInfo = restaurantInfo;
  
  saveState(currentState);
  res.json({ success: true, state: currentState });
});

// Vite or Static Assets middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Celeste server running on http://localhost:${PORT}`);
  });
}

startServer();
