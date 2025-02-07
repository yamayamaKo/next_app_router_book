import connectDB from "@/app/util/database";
import { ItemModel } from "@/app/util/schemaModels";
import { NextResponse } from "next/server";
import { Context } from "node:vm";

export async function DELETE(request: Request, context: Context) {
  const { id } = context.params;

  try {
    await connectDB();
    await ItemModel.deleteOne({ _id: id})
    return NextResponse.json({ message: "アイテム削除成功" });
  } catch {
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}
