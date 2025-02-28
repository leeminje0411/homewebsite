"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faHome,
  faCompass,
  faBell,
  faBookOpen,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUserCircle,
  faCalendar,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export function Profile({ kakaoAccount }) {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" }); // ✅ 로그아웃 요청 보내기
    window.location.href = "/";
  };
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="font-bold text-base">{kakaoAccount.nickname}</span>
          <Image
            src={kakaoAccount.imgUrl}
            alt="profile"
            width={50}
            height={50}
            className="rounded-full border border-gray-300 shadow-md"
          />
        </div>
        {console.log(kakaoAccount)}
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 bg-white shadow-lg rounded-lg border">
        <p className="text-sm text-gray-600">안녕하세요, {kakaoAccount.nickname}님!</p>
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full mt-2"
        >
          로그아웃
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default function Navigation({ kakaoAccount }) {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.refresh(); // 페이지 새로고침 (쿠키 삭제 반영)
  };
  // 사이드바 열림/닫힘 여부
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 모바일 검색어
  const [searchQuery, setSearchQuery] = useState("");

  const topNavItems = [
    { name: "홈", href: "/", icon: faHome },
    { name: "일정", href: "/Calendar", icon: faCalendar },
    { name: "갤러리", href: "/Contact", icon: faCompass },
    { name: "공지사항", href: "/Nofi", icon: faBell },
  ];

  // 사이드바(메인 섹션)
  // 유튜브 예시로는 홈, 탐색, Shorts, 구독, 보관함, 시청기록 ...
  const mainSidebarItems = [
    { name: "홈", href: "/", icon: faHome },
    { name: "탐색", href: "/explore", icon: faCompass },
    { name: "구독", href: "/subscribe", icon: faBell },
    { name: "보관함", href: "/library", icon: faBookOpen },
    { name: "시청기록", href: "/history", icon: faClock },
  ];

  // 사이드바(구독 섹션) - 예시
  // 실제론 로그인 상태나 구독 채널 목록을 불러와서 렌더링할 수 있음
  const subscribedChannels = [
    { name: "내 채널", href: "/mychannel" },
    { name: "React 공식", href: "/react" },
    { name: "Next.js 공식", href: "/nextjs" },
    { name: "Tailwind CSS", href: "/tailwind" },
  ];

  // 사이드바 토글 핸들러
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 검색 핸들러(모바일 전용)
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`검색어: ${searchQuery}`);
  };

  return (
    <div className="relative">
      {/* 상단바 (헤더 영역) */}
      <header className="flex items-center justify-between bg-black px-4 text-white">
        <div className="flex items-center space-x-3">
          {/* 햄버거 버튼 */}
          <button
            className="text-2xl hover:bg-gray-800 p-2 rounded-full"
            onClick={handleSidebarToggle}
            aria-label="Toggle sidebar"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* 로고 (유튜브처럼) */}
          <Link href="/" className="flex items-center ">
            <span className="text-white ">우리 가족 사이트</span>
          </Link>
        </div>

        {/* 오른쪽 아이콘들 (예: 일정, 프로필) */}
        <div className="flex items-center space-x-3">
          {kakaoAccount ? (
            <> <Profile kakaoAccount={kakaoAccount} /> </>
          ) : (
            <Link href={`https://kauth.kakao.com/oauth/authorize?client_id=25c1623109e7ac126df4e70791261b05&redirect_uri=${BASE_URL}/oauth&response_type=code&prompt=login`} className="hover:bg-gray-800 p-2 rounded-full">
              <FontAwesomeIcon icon={faCircleUser} className="text-2xl" />
            </Link>
          )}
        </div>
      </header>

      {/* 검색창 (모바일 전용, 데스크톱에선 숨김) */}
      {/* 
      상단바 아래 탭(데스크톱 전용)
      <nav className="bg-white border-b hidden md:block">
        <ul className="flex space-x-4 p-2">
          {topNavItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className={clsx(
                  "flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-200",
                  pathname === item.href && "bg-gray-300"
                )}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}

      {/* 사이드바 (슬라이드 아웃) */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ zIndex: 1000 }}
      >
        {/* 사이드바 상단 */}
        <div className="flex items-center justify-between p-4 bg-gray-100">
          <h2 className="text-xl font-semibold">유튜브 스타일 메뉴</h2>
          <button
            onClick={handleSidebarToggle}
            className="text-xl p-2 hover:bg-gray-200 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* 메인 섹션 */}
        <ul className="p-4 space-y-2 border-b">
          {mainSidebarItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className={clsx(
                  "flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-200",
                  pathname === item.href && "bg-gray-300"
                )}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FontAwesomeIcon icon={item.icon} className="text-xl" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* 구독 섹션 (유튜브에서 자주 보이는 부분) */}
        <div className="p-4 space-y-2">
          <h3 className="text-md font-semibold text-gray-500">구독</h3>
          <ul className="space-y-1">
            {subscribedChannels.map((channel, i) => (
              <li key={i}>
                <Link
                  href={channel.href}
                  className="block px-4 py-2 rounded-md hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {channel.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* 사이드바 배경 오버레이 (열렸을 때 클릭하면 닫힘) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          style={{ zIndex: 999 }}
          onClick={handleSidebarToggle}
        />
      )}
    </div>
  );
}