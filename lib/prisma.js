import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

//globalThis ensures that prisma client instance is reused across hot reloads during developent. Without this, each time your application reloads a new instance of prismaclient would be created leading to connection issue 