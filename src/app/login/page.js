"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {useRouter}  from "next/navigation";



export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
      e.preventDefault();
    // TODO: 로그인 로직 구현
   
      await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      })
        .then((res) => {res.json()
 res.status === 200 ? router.push('/') : alert('로그인 실패');
        }
      )
     .catch((error) => {
          console.error('Error:', error);
        });
    }



  return (
    <div className>
      <Card className="w-full max-w-md border">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>계정 정보를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이메일 */}
            <div className="grid w-full items-center gap-1">
              <Label htmlFor="id">이메일</Label>
              <Input
                id="id"
                type="id"
                placeholder="you@example.com"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            {/* 패스워드 */}
            <div className="grid w-full items-center gap-1">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* 옵션들 (아이디 저장 등) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" />
                <Label htmlFor="rememberMe">아이디 저장</Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                비밀번호 찾기
              </Link>
            </div>

            {/* 로그인 버튼 */}
            <Button type="submit" onClick={e=>handleSubmit}className="w-full mt-2">
              로그인
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">계정이 없으신가요?</p>
          <Link href="/register" className="text-sm text-blue-600 hover:underline">
            회원가입
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}