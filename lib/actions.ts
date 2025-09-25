"use server";

import { cookies } from "next/headers";
import { User, users } from "./users";
import { redirect } from "next/navigation";
import { generateAccessToken, generateRefreshToken } from "./jwt";
import { jwtVerify } from "jose";
import { hasRole } from "@/app/utils/auth";

export async function authenticate(_state: unknown, formData: FormData) {
  console.log("state", _state, "FORM DATA", formData.get("email"));
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user: User | undefined = users.find(
    (user: User) => user.email === email && user.password === password
  );

  if (!user) {
    return "Invalid user";
  }
  //----------- session based login----------- \\
  // cookies().set("currentUser", JSON.stringify(user), {
  //   httpOnly: true,
  //   path: "/",
  //   maxAge: 60 * 60, // 1h
  // });
  // redirect("/dashboard");

  //---------- jwt based login--------------- \\

  if (!hasRole(user.role, ["admin", "user"])) {
    redirect("unauthorized");
  }

  const accessToken = await generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = await generateRefreshToken({
    userId: user.id,
  });

  cookies().set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 2, // 2 days
  });

  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 15, // 1 minute
  });

  redirect("/dashboard");
}

export async function getSession() {
  const cookie = cookies().get("currentUser")?.value;
  return cookie ? JSON.parse(cookie) : null;
}

// export async function getJWTSession() {
//   const cookie = cookies().get("accessToken")?.value;
//   return cookie ? JSON.parse(cookie) : null;
// }

export async function getJWTSession() {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)
    );
    return payload;
  } catch {
    return null;
  }
}

// export async function logout() {
//   cookies().delete("currentUser");
//   redirect("/");
// }

export async function logout() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect("/login");
}
