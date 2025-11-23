//Author: Ayaan
import { Color, Size, type Order, type Env } from './types';

interface OrderInput {
  name: string;
  studentId: number;
  email: string;
  color: Color;
  size: Size;
  paymentId: string;
}

/**
 * Saves order information to the D1 database.
 * @param orderDetails - The order data received from the request body.
 * @param env - The environment variables containing the D1 database.
 * @returns A promise that resolves to the newly created order document from the database.
 */
export async function writeOrderToDB(
  orderDetails: OrderInput,
  env: Env
): Promise<Order> {
  const documentToInsert: Omit<Order, 'id'> = {
    name: orderDetails.name,
    studentId: orderDetails.studentId,
    email: orderDetails.email,
    color: orderDetails.color,
    size: orderDetails.size,
    paymentId: orderDetails.paymentId,
    createdAt: new Date().toISOString(),
  };

  try {
    const stmt = env.DB.prepare(`
      INSERT INTO orders (name, studentId, email, color, size, paymentId, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      documentToInsert.name,
      documentToInsert.studentId,
      documentToInsert.email,
      documentToInsert.color,
      documentToInsert.size,
      documentToInsert.paymentId,
      documentToInsert.createdAt
    );

    const result = await stmt.run();

    const insertedId = result.meta.last_row_id;

    // tempory console message for dev
    console.log(
      `Order successfully written to DB with id: ${insertedId}`
    );

    return {
      id: insertedId,
      ...documentToInsert,
    };
  } catch (error) {
    console.error('Failed to write order to D1', error);
    throw new Error('Database write operation failed.');
  }
}
