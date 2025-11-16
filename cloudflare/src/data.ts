//Author: Ayaan
import { MongoClient, ServerApiVersion } from "mongodb";

import { Color, Size, type Order, type Env } from "./types";
interface OrderInput {
  name: string;
  studentId: number;
  color: Color;
  size: Size;
}

/**
 * Saves order information to the MongoDB Atlas database.
 * @param orderDetails - The order data received from the request body.
 * @param env - The environment variables containing secrets (DB_URL) and configuration.
 * @returns A promise that resolves to the newly created order document from the database.
 */
export async function writeOrderToDB(
  orderDetails: OrderInput,
  env: Env
): Promise<Order & { _id: any }> {
  if (!env.DB_URL) {
    throw new Error("DB_URL environment variable is not set.");
  }

  const client = new MongoClient(env.DB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const db = client.db(env.MONGODB_DB || "merch_orders");
    const collection = db.collection<Order>(env.MONGODB_COLLECTION || "orders");

    
    const documentToInsert: Order = {
      name: orderDetails.name,
      studentId: orderDetails.studentId,
      color: orderDetails.color,
      size: orderDetails.size,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(documentToInsert);
    
    // tempory console message for dev 
    console.log(`Order successfully written to DB with id: ${result.insertedId}`);

    return {
      ...documentToInsert,
      _id: result.insertedId,
    };
  } catch (error) {
    console.error("Failed to write order to MongoDB", error);
    throw new Error("Database write operation failed.");
  } finally {
    await client.close();
  }
}