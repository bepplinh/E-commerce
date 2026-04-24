import prisma from "../config/prisma.js";

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to MySQL");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
  }
}

checkConnection();
