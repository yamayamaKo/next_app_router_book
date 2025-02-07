import connectDB from "@/app/util/database";
import { ItemModel } from "@/app/util/schemaModels";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB()
    const allItems = await ItemModel.find()
    return NextResponse.json({message: "アイテム読み取り成功（全件）", allItems: allItems})
  } catch {
    return NextResponse.json({message: "アイテム読み取り失敗（全件）"})
  }
}