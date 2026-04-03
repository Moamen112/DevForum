// getting-started.js
import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";
import "@/database";

const MONGODB_URI = process.env.MONGODB_URI?.trim();

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function getMongoConnectionHelp(error: unknown): string | null {
  const mongoError = error as NodeJS.ErrnoException & { hostname?: string };

  if (mongoError?.code === "ENOTFOUND") {
    const hostname = mongoError.hostname ?? "the configured MongoDB host";

    return `MongoDB DNS lookup failed for ${hostname}. Check that MONGODB_URI uses your current MongoDB Atlas connection string, the cluster hostname still exists, and your network allows SRV DNS lookups. If SRV lookups are blocked on your machine or network, use the standard Atlas connection string (mongodb://...) instead of mongodb+srv://.`;
  }

  return null;
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "dev-forum",
      })
      .then((result) => {
        logger.info("MongoDB connected");
        return result;
      })
      .catch((error: unknown) => {
        const helpMessage = getMongoConnectionHelp(error);

        if (helpMessage) {
          const mongoError = error as NodeJS.ErrnoException & {
            hostname?: string;
          };

          logger.error(
            {
              code: mongoError.code,
              hostname: mongoError.hostname,
            },
            helpMessage
          );

          throw new Error(helpMessage, {
            cause: error instanceof Error ? error : undefined,
          });
        }

        logger.error({ err: error }, "MongoDB connection error");
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
