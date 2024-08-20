import { connect, connection } from "mongoose";

connection.on("connected", () => {
  console.info("[INFO] Mongoose connected to MongoDB");
});

connection.on("error", (err) => {
  console.error("[ERROR] Mongoose connection error", err);
});

connection.on("disconnected", () => {
  console.info("[INFO] Mongoose disconnected from MongoDB");
});

process.on("SIGINT", () => {
  connection.close();
});

const connectToMongo = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("MONGO_URI not provided. Please provide your MongoDB URI in .env file");
    }
    // Need to specify MONGO_URI in .env file
    await connect(process.env.MONGO_URI || "");
    console.info("[INFO] Connected to MongoDB");
  } catch (err: any) {
    console.error("[ERROR] Failed to connect to MongoDB. Reason -", err?.message);
  }
};

export { connectToMongo };