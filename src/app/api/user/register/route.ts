import connectDB from "@/app/util/database";
import { UserModel } from "@/app/util/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqBody = await request.json();

  try {
    await connectDB();
    await UserModel.create(reqBody)
    return NextResponse.json({ message: "ユーザー登録成功"})
  } catch {
    return NextResponse.json({ message: "ユーザー登録失敗"})
  }
}
