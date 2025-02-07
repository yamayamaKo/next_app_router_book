import connectDB from "@/app/util/database";
import { ItemModel } from "@/app/util/schemaModels";
import { NextResponse } from "next/server";
import { Context } from "node:vm";

export async function PUT(request: Request, context: Context) {
  const body = await request.json()
  const { id } = await context.params; // TODO: なぜこれはawaitが必要なのか？調べる
  // Error: Route "/api/item/update/[id]" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis at PUT (src/app/api/item/update/[id]/route.ts:8:34)
  
  try {
    await connectDB();
    await ItemModel.updateOne({ _id: id}, body)
    return NextResponse.json({ message: "アイテム更新成功" });
  } catch {
    return NextResponse.json({ message: "アイテム更新失敗" });
  }
}
