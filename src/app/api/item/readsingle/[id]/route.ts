import connectDB from "@/app/util/database";
import { ItemModel } from "@/app/util/schemaModels";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "node:vm";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const item = await ItemModel.findById(id);
    return NextResponse.json({
      message: "アイテム読み取り成功（単一）",
      item: item,
    });
  } catch {
    return NextResponse.json({ message: "アイテム読み取り失敗（単一）" });
  }
}
