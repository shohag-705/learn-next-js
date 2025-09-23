import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware called", req.nextUrl.pathname);

  const session = req.cookies.get("currentUser")?.value;

  const { pathname } = req.nextUrl;

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
