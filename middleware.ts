import { NextRequest, NextResponse } from "next/server";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./lib/jwt";
import { hasRole } from "./app/utils/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  console.log("Middleware called", req.nextUrl.pathname);

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken) {
    const decodedAccessToken = await verifyAccessToken(accessToken);
    if (decodedAccessToken) {
      return NextResponse.next();
    }
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decodedRefreshToken = await verifyRefreshToken(refreshToken);
  if (!decodedRefreshToken) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("accessToken", "", { maxAge: -1, path: "/" });
    response.cookies.set("refreshToken", "", { maxAge: -1, path: "/" });
    return response;
  }

  if (decodedRefreshToken) {
    const newAccessToken = await generateAccessToken({
      userId: decodedRefreshToken.userId,
      email: decodedRefreshToken.email,
      role: decodedRefreshToken.role,
    });
    const verifiedNewAccessToken = await verifyAccessToken(newAccessToken);

    const response = NextResponse.next();
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 1,
    });
    if (!hasRole(verifiedNewAccessToken.role, ["admin", "user"])) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return response;
  }

  if (url.pathname.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/protected/:path*", "/about/:path*"],
};
