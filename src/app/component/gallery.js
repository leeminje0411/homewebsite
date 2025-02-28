
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default async function Gallery() {
  // 가상의 임시 데이터 (사진 URL 배열)
  const photos = [
    {
      id: 1,
      url: 'https://linkup-mj12270411.s3.ap-northeast-2.amazonaws.com/1740199186750_fa59aa_84647d6f98c34e3b9354999b5f3916fd~mv2.avif', // 빨간색 임시 이미지
    },
    {
      id: 2,
      url: 'https://linkup-mj12270411.s3.ap-northeast-2.amazonaws.com/1740187071392_fa59aa_deadb8f28ffc456ba188bbc38b579e37~mv2.avif', // 초록색
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-between items-center'>
        <h1 className="text-4xl font-bold mb-6">갤러리</h1>
        <div><Link href='/'>더 보기</Link></div>
      </div>
      {/* grid: 5컬럼 레이아웃 + 갭 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
        {photos.map((photo) => (
          <div key={photo.id} className="border rounded-lg overflow-hidden">
            <Image
              src={photo.url}
              alt={`Placeholder ${photo.id}`}
              className="w-full h-auto object-cover"
               width={500} // 원하는 너비
              height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";