import React from 'react';



export default function Schedule({ schedules, className }) {
  
  return (
    <div className={`container mx-auto p-4 ${className}`}>

      
      <h1 className="text-4xl font-bold text-cente m-5">오늘의 일정</h1>
    
    
      {/* 테이블 컨테이너: 수평 스크롤 가능 */}
      <div className="overflow-x-auto">
        {/* 모던 느낌을 위해 table-fixed + 약간의 줄/색상 정리 */}
        <table className="table-fixed w-full text-sm text-left text-gray-700 border-collapse">
          {/* 헤더: 검은색 바탕, 흰색 글씨 */}
          <thead className="bg-black text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3 w-[15%]">작성자</th>
              <th className="px-4 py-3 w-[30%]">일정</th>
              <th className="px-4 py-3 w-[20%]">날짜</th>
              <th className="px-4 py-3 w-[15%]">시작</th>
              <th className="px-4 py-3 w-[15%]">종료</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(item => (
              <tr
                key={item.id}
                // 짝수행, 홀수행 배경색 다르게 (줄무늬)
                className="odd:bg-white even:bg-gray-50 border-b last:border-0 hover:bg-gray-100"
              >
                <td className="px-4 py-3 truncate">{item.writer}</td>
                <td className="px-4 py-3 truncate">{item.schedule}</td>
                <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-3">{item.startTime}</td>
                <td className="px-4 py-3">{item.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}