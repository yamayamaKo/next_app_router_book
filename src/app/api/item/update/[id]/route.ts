import connectDB from "@/app/util/database";
import { ItemModel } from "@/app/util/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const { id } = await context.params; // TODO: なぜこれはawaitが必要なのか？調べる
  // Error: Route "/api/item/update/[id]" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis at PUT (src/app/api/item/update/[id]/route.ts:8:34)

  try {
    await connectDB();

    // メアドが一致チェック
    // 本当はJWTのメールと一致するかチェックするべき
    const singleItem = await ItemModel.findById(id);
    if (singleItem.email !== body.email)
      throw new Error("メールアドレスが一致しません");

    await ItemModel.updateOne({ _id: id }, body);
    return NextResponse.json({ message: "アイテム更新成功" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "アイテム更新失敗" });
  }
}
