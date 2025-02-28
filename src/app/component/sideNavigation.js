"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

/** 폰트어썸 아이콘 예시 (필요 없으면 제거) */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faBell, faBookOpen, faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function YoutubeStyleSidebar() {
  const pathname = usePathname();

  // 사이드바 항목 (유튜브 느낌)
//   const sidebarItems = [
//     { name: "홈", href: "/", icon: faHome },
//     { name: "탐색", href: "/explore", icon: faCompass },
//     { name: "구독", href: "/subscribe", icon: faBell },
//     { name: "보관함", href: "/library", icon: faBookOpen },
//     { name: "시청기록", href: "/history", icon: faClock },
//   ];

    const sidebarItems= [
      { name: "홈", href: "/", icon: faHome },
      { name: "일정", href: "/Calendar", icon: faCalendar },
      { name: "갤러리", href: "/Contact", icon: faCompass },
      { name: "공지사항", href: "/Nofi", icon: faBell },
    ];
  // 구독 채널(가상의 예시)
  const subscribedChannels = [
    { name: "내 채널", href: "/mychannel" },
    { name: "React 공식", href: "/react" },
    { name: "Next.js 공식", href: "/nextjs" },
    { name: "Tailwind CSS", href: "/tailwind" },
  ];

  return (
    <div className="flex h-screen">
      {/* 왼쪽 사이드바 (고정) */}
      <aside className="w-60 h-screen bg-white shadow-md flex flex-col">
        {/* 상단 로고 또는 제목 */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">유튜브 사이드바</h2>
        </div>

        {/* 네비게이션 섹션 */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="border-b">
            {sidebarItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center space-x-2 px-4 py-3 hover:bg-gray-200",
                    pathname === item.href && "bg-gray-300"
                  )}
                >
                  {item.icon && (
                    <FontAwesomeIcon icon={item.icon} className="text-lg" />
                  )}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* 구독 섹션 */}
          <div className="p-4">
            <h3 className="text-md font-semibold text-gray-600 mb-2">구독</h3>
            <ul>
              {subscribedChannels.map((channel, i) => (
                <li key={i}>
                  <Link
                    href={channel.href}
                    className="block px-4 py-2 rounded-md hover:bg-gray-200"
                  >
                    {channel.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* 오른쪽 메인 컨텐츠 영역 */}
  
    </div>
  );
}