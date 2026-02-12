import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
//app.use(logger);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/build");
  console.log("✅ Serving static files from:", frontendPath);

  app.use(express.static(frontendPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
  setInterval(() => {
    fetch("https://slack-online-chat-application-4.onrender.com").catch(
      () => {}
    );
  }, 300000);
}
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("/:userId", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });
app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  }
});
app.use(errorHandler);
server.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
  connectDB();
});
