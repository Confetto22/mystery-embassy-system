import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error"],
});

// Connection state
let isConnected = false;

// Connect to database
const connect = async () => {
  try {
    if (!isConnected) {
      await prisma.$connect();
      isConnected = true;
      console.log("✅ Database connected successfully");
    }
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    isConnected = false;
    return false;
  }
};

// Disconnect from database
const disconnect = async () => {
  try {
    if (isConnected) {
      await prisma.$disconnect();
      isConnected = false;
      console.log("✅ Database disconnected successfully");
    }
  } catch (error) {
    console.error("❌ Database disconnection failed:", error.message);
  }
};

// Test database connection
const testConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("❌ Database test failed:", error.message);
    return false;
  }
};

// Handle graceful shutdown
process.on("beforeExit", async () => {
  await disconnect();
});

process.on("SIGINT", async () => {
  await disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnect();
  process.exit(0);
});

// Export both the client and connection functions
export { prisma, connect, disconnect, testConnection, isConnected };
