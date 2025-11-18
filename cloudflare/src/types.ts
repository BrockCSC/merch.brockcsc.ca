export enum Color {
  Black = "BLACK",
  White = "WHITE",
}

export enum Size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}

export interface Order {
  name: string;
  studentId: number;
  email: string;
  color: Color;
  size: Size;
  paymentId: string;
  createdAt: Date;
}


export interface Env {
  // Secrets
  PAYMENT_API_KEY: string;
  DB_URL: string; 
  MAIL_API_KEY: string;

  // Variables
  MONGODB_DB?: string;
  MONGODB_COLLECTION?: string;
}