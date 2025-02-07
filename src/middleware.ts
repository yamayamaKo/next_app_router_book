import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// appディレクトリと同じ階層に置く
// 全てのAPIルートのリクエストの前に実行される
export async function middleware(request: Request) {
  const token = await request.headers.get("Authorization")?.split("Bearer ")[1]

  if (!token) {
    return NextResponse.json({ message: "認証エラー" }, { status: 401 })
  }

  try {
    // トークンの検証
    verifyToken(token)

    return NextResponse.next()
  } catch {
    return NextResponse.json({ message: "トークンが間違っています" }, { status: 401 })
  }
}

export const verifyToken = async (token: string) => {
    const secretKey = new TextEncoder().encode(process.env.SERVER_KEY)
    const decodedJwt = await jwtVerify(token, secretKey)

    return decodedJwt
}

export const config = {
  matcher: [
    // appディレクトリ以下の指定でOK
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ]
}