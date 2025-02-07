import connectDB from "@/app/util/database";
import { ItemModel } from "@/app/util/schemaModels";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "node:vm";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const { id } = await context.params;

  try {
    await connectDB();

    const singleItem = await ItemModel.findById(id);
    if (singleItem.email !== body.email)
      throw new Error("メールアドレスが一致しません");

    await ItemModel.deleteOne({ _id: id });
    return NextResponse.json({ message: "アイテム削除成功" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}
