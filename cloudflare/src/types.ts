export enum Color {
  Red = "RED",
  Black = "BLACK",
  White = "WHITE",
}

export enum Size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export interface Order {
  name: string;
  studentId: number;
  color: Color;
  size: Size;
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