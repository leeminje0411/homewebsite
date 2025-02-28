/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "k.kakaocdn.net", // ✅ 카카오 CDN 추가
      },
      {
        protocol: "https",
        hostname: "linkup-mj12270411.s3.ap-northeast-2.amazonaws.com", // ✅ AWS S3 추가
      },
    ],
    domains: [
      "k.kakaocdn.net", // ✅ 카카오 CDN
      "linkup-mj12270411.s3.ap-northeast-2.amazonaws.com", // ✅ AWS S3
    ],
  },
};

export default nextConfig;