import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // ❌ لو لا يوجد توكن ويحاول دخول /seller/Dashboard → redirect


  // console.log(pathname.startsWith('/seller/dashboard'))

  // if (pathname.startsWith('/seller/dashboard')) {
  //   if(!token){
  //     return NextResponse.redirect(new URL('/seller', req.url))
  //   }
  // }

//   // ✅ لو يوجد توكن ويحاول دخول /seller → redirect مباشرة للـ Dashboard
//   if (token && pathname === '/seller') {
//     return NextResponse.redirect(new URL('/seller/dashboard', req.url));
//   }


  // Allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/seller/:path*'],
};