import { D1Database } from '@cloudflare/workers-types';

export enum Color {
  Black = 'BLACK',
  White = 'WHITE',
}

export enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export interface Order {
  id: number;
  name: string;
  studentId: number;
  email: string;
  color: Color;
  size: Size;
  paymentId: string;
  createdAt: string;
}

export interface Env {
  // Secrets
  PAYMENT_API_KEY: string;
  MAIL_API_KEY: string;
  WEBHOOK_SECRET: string;

  // Database
  DB: D1Database;

  // Variables
  SENDER_EMAIL: string;
  SENDER_NAME: string;
  TEMPLATE_ID: string;
}
