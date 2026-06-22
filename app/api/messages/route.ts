import { NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";

export async function GET() {
  const data = await db.select().from(messages);

  return NextResponse.json({
    ok: true,
    messages: data,
  });
}
