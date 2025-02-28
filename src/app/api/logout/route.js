import { NextResponse } from "next/server";


export async function POST() {
  // ✅ JWT 삭제 (쿠키 제거)
  const response = NextResponse.json({ message: "로그아웃 완료" });

  response.cookies.set("token", "", { maxAge: 0, path: "/" }); // ✅ 토큰 삭제

  return response;
}