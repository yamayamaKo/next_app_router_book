import connectDB from "@/app/util/database";
import { ItemModel } from "@/app/util/schemaModels";
import { NextResponse } from "next/server";
import { Context } from "node:vm";

export async function GET(request: Request, context: Context) {
  try {
    await connectDB();
    const item = await ItemModel.findById(context.params.id);
    return NextResponse.json({
      message: "アイテム読み取り成功（単一）",
      item: item,
    });
  } catch {
    return NextResponse.json({ message: "アイテム読み取り失敗（単一）" });
  }
}
