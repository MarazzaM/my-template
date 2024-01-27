import { withAuth } from 'next-auth/middleware';

const publicFileRegex = /\.(.*)$/;
const anonymousRoutes = ['/', '/login', '/register', '/auth/error']; // The whitelisted routes

export default withAuth({
    callbacks: {
        authorized: ({ req }) => {
            const { pathname } = req.nextUrl;

            // Important! The below only checks if there exists a token. The token is not validated! This means
            // unauthenticated users can set a next-auth.session-token cookie and appear authorized to this
            // middleware. This is not a big deal because we do validate this cookie in the backend and load
            // data based off of its value. This middleware simply redirects unauthenticated users to the login
            // page (and sets a callbackUrl) for all routes, except static files, api routes, Next.js internals,
            // and the whitelisted anonymousRoutes above.
            return Boolean(
                req.cookies.get('next-auth.session-token') || // check if there's a token
                    pathname.startsWith('/_next') || // exclude Next.js internals
                    pathname.startsWith('/api') || //  exclude all API routes
                    pathname.startsWith('/static') || // exclude static files
                    publicFileRegex.test(pathname) || // exclude all files in the public folder
                    anonymousRoutes.includes(pathname)
            );
        },
    },
    // If you have custom pages like I do, these should be whitelisted!
    pages: {
        // error: '/auth/error',
        signIn: '/login',
        // verifyRequest: '/auth/verify-request',
    },
});

/* START EXAMPLE CONFIG */

// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(req: NextRequest) {
//   // Get the pathname of the request (e.g. /, /protected)
//   const path = req.nextUrl.pathname;

//   // If it's the root path, just render it
//   if (path === "/") {
//     return NextResponse.next();
//   }

//   const session = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (!session && path === "/protected") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   } else if (session && (path === "/login" || path === "/register")) {
//     return NextResponse.redirect(new URL("/protected", req.url));
//   }
//   return NextResponse.next();
// }

/* END EXAMPLE CONFIG */

/* DEFAULT CONFIG */

// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/dashboard"] }

/* SUGGESTED CONFIG*/

/*ANOTHER EXAMPLE

import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/profile')) {
    // Add /profile specific logics
  }
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Add /dashboard specific logics
  }
}
export const config = {
  matcher: ['/profile/:path*', '/dashboard/:path*'],
}

*/
