"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      alert("인가 코드가 없습니다.");
      router.push("/login");
      return;
    }

    async function sendCodeToServer() {
      const res = await fetch("/api/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ 로그인 성공:", data);
        window.location.href = "/";
      } else {
        console.error("❌ 로그인 실패:", data.error);
        alert("로그인 실패: " + data.error);
        router.push("/login");
      }
    }

    sendCodeToServer();
  }, [code, router]);

  return <p>로그인 처리 중...</p>;
}