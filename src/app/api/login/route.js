import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

const jwtSecret = process.env.TOKEN_SECRET;

export async function POST(req) {

    console.log('logi 받았음')
    const {id, password} = await req.json();
    if(id === 'admin' && password === 'admin'){
          const token = jwt.sign(
        { userId: id }, // payload에 유저 식별 정보
       jwtSecret,
            { expiresIn: "1h" } // 토큰 만료 시간
              );        
        const response = NextResponse.json({ message: '로그인 성공' }, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 *60,
            path: '/',
        });
                return response;}
    else{
        return NextResponse.json({ message: '로그인 실패' }, { status: 500 });
    }

    
}


