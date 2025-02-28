import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./component/Navigation";
import FontAwesomeConfig from "./fontawesome";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import  {supabase}  from '@/lib/db';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const jwtSecret = process.env.TOKEN_SECRET;

export default async function RootLayout({ children }) {
  // const token = await cookies().get("token")?.value;
  // let kakaoAccount = null;
  // let result = null;
  // if (token) {
  //   try {
  //     // 2) JWT 검증
  //     const decoded = jwt.verify(token, jwtSecret);
  //     result = await supabase.from('profile').select('*').eq('kakaoId', decoded.kakaoId).single();
  //     kakaoAccount = result.data;
  //   } catch (err) {
  //     // 토큰 만료 or 검증 실패
  //     console.log("Invalid token");
  //   }
  // }

  return (
   <html>
      <head>
        <FontAwesomeConfig></FontAwesomeConfig>
      </head>
      <body className="bg-gray-100"> {/* Ensure body has Tailwind classes if needed */}
        <header> 
        {/* <Navigation kakaoAccount={kakaoAccount}></Navigation> */}
        </header>
        <main>
          <div className="flex">
            {/* <SideNaigation></SideNaigation> */}
          {children}
          </div>
        </main>
      </body>
    </html>
  );
}
export const dynamic = "force-dynamic";