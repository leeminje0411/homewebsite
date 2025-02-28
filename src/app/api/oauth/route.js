import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/db";
import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // 개발환경과 배포환경 자동 분기


export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "인가 코드가 없습니다." }, { status: 400 });
    }

    // 🔹 1) 카카오 토큰 요청
    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: '25c1623109e7ac126df4e70791261b05',
        redirect_uri: BASE_URL+"/oauth",
        code: code,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return NextResponse.json({ error: "토큰 요청 실패" }, { status: 400 });
    }

    // 🔹 2) 카카오 유저 정보 가져오기
    const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const userData = await userRes.json();
    if (!userData.id) {
      return NextResponse.json({ error: "유저 정보 요청 실패" }, { status: 400 });
    }

    // 🔹 3) DB 조회 & 저장
    const userId = `kakao_${userData.id}`;
    const { data: existingUser } = await supabase.from("profile").select("kakaoId,id").eq("kakaoId", userId).single();

    if (!existingUser) {
      await supabase.from("profile").insert([
        { kakaoId: userId, nickname: userData.kakao_account.profile.nickname, imgUrl: userData.kakao_account.profile.thumbnail_image_url },
      ]);
    } else {
      await supabase.from("profile").update({
        nickname: userData.kakao_account.profile.nickname,
        imgUrl: userData.kakao_account.profile.profile_image_url,
      }).eq("kakaoId", userId);
    }

    // 🔹 4) JWT 생성 & 쿠키 저장
    const token = jwt.sign({ kakaoId: userId , id : existingUser.id}, process.env.TOKEN_SECRET, { expiresIn: "1h" });


    const response = NextResponse.json({ message: "로그인 성공" });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("❌ OAuth 처리 중 오류:", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}