const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const groupRoutes = require("./routes/groups");
const noteRoutes = require("./routes/notes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/groups",  groupRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Process-level Error Handling to debug crashes
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...', err);
  process.exit(1);
});

let server;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected successfully");
    startServer();
  })
  .catch((err) => console.error("Database connection error:", err));

const startServer = () => {
  server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, retrying in 1 second...`);
      setTimeout(() => {
        server.close();
        startServer();
      }, 1000);
    } else {
      console.error("Server error:", err);
    }
  });
};

// Graceful Shutdown to prevent EADDRINUSE
const gracefulShutdown = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
