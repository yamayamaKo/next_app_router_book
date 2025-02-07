import connectDB from "@/app/util/database";
import { ItemModel } from "@/app/util/schemaModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    await connectDB()
    await ItemModel.create(body)
    return NextResponse.json({message: "アイテム作成成功"})
  } catch {
    return NextResponse.json({message: "アイテム作成失敗"})
  }
}
