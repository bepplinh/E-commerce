import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(
    `[server] Running in ${process.env.NODE_ENV ?? "development"} mode on port ${PORT}`
  );
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
const shutdown = (signal) => {
  console.log(`[server] ${signal} received – shutting down gracefully`);
  server.close(() => {
    console.log("[server] HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
