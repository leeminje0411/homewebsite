import React from 'react'
import  {supabase}  from '@/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Schedule from "@/app/component/schedule";

export async function GET(req) {

    console.log('Get요청 받았음')
  
 const { data, error } = await supabase
  .from("schedule")
  .select("*, profile(nickname,imgUrl)")
if (error) {
  console.error("❌ Supabase Error:", error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}

const enrichedData = data.map(item => ({
  ...item,
  writer: item.profile?.nickname || "알 수 없음" // writer를 nickname으로 덮어쓰기
}))

return NextResponse.json(enrichedData);
};



export async function POST(req) {
  console.log('앙기모씨');
  const token = await cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('Payload:', payload); // Log the payload to see its contents
  } catch (err) {
    console.error('JWT Verification Error:', err); // Log any errors during verification
    return NextResponse.json({ error: "토큰이 유효하지 않습니다." }, { status: 403 });
  }
  console.log('페이로드:', payload.id);
  const content  = await req.json();
  console.log('풍부한 컨텐츠:', content); // Log the content to 

  const { data, error } = await supabase.from("schedule").insert([
    { writer: payload.id, schedule: content.schedule, startTime: content.startTime, endTime: content.endTime }
  ]);
  console.log('이게 쿼리닷:', data, error); // Log the data returned from the insert operation

  if (error) {
    console.error('Supabase Insert Error:', error); // Log any errors during the insert operation
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "게시글 작성 성공" }, { status: 200 });
}






export async function DELETE(req) {
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, "my_secret_key");
  } catch (err) {
    return NextResponse.json({ error: "토큰이 유효하지 않습니다." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "삭제할 ID가 필요합니다." }, { status: 400 });
  }

  // ✅ 요청한 사용자가 작성자인지 확인
  const { data: post } = await supabase.from("schedule").select("writer").eq("id", id).single();


  if (!post || post.writer !== payload.id) {
    return NextResponse.json({ error: "삭제 권한이 없습니다." }, { status: 403 });
  }

  // ✅ 삭제 실행
  const { error } = await supabase.from("schedule").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "삭제 완료" }, { status: 200 });
}



