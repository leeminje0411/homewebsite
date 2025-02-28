import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/db";
import Schedule from "@/app/component/schedule";

const jwtSecret = process.env.TOKEN_SECRET;

export async function POST(req) {
  console.log('앙기모씨');
  const token = await cookies().get("token")?.value;
  console.log('Token:', token); // Log the token to ensure it's being retrieved

  if (!token) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
    console.log('Payload:', payload); // Log the payload to see its contents
  } catch (err) {
    console.error('JWT Verification Error:', err); // Log any errors during verification
    return NextResponse.json({ error: "토큰이 유효하지 않습니다." }, { status: 403 });
  }

  const { content } = await req.json();
  console.log('Content:', content); // Log the content to ensure it's being received

  if (!content) {
    return NextResponse.json({ error: "내용을 입력하세요." }, { status: 400 });
  }

  // ✅ `writer` 정보 자동 추가 (닉네임 + 고유 ID)
  const { data, error } = await supabase.from("posts").insert([
    { writer: payload.id, schedule: content.schedule, startTime: content.startTime, endTime: content.endTime }
  ]);
  console.log('Insert Data:', data); // Log the data returned from the insert operation

  if (error) {
    console.error('Supabase Insert Error:', error); // Log any errors during the insert operation
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "게시글 작성 성공" }, { status: 200 });
}