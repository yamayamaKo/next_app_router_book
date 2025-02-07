import connectDB from "@/app/util/database";
import { UserModel } from "@/app/util/schemaModels";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqBody = await request.json();

  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });

    if (savedUserData) {
      if (reqBody.password === savedUserData.password) {
        // 認証成功

        // シークレットキーを作成
        const secretKey = new TextEncoder().encode(process.env.SERVER_KEY);

        // ペイロードを作成
        const payload = { email: reqBody.email };

        // JWTを作成
        const jwt = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("6h")
          .sign(secretKey);

        return NextResponse.json({ message: "ログイン成功", token: jwt});
      } else {
        return NextResponse.json({
          message: "ログイン失敗: パスワードが違います",
        });
      }
    } else {
      return NextResponse.json({
        message: "ログイン失敗: ユーザー登録をしてください",
      });
    }
  } catch {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}
