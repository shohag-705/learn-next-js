"use server";

import { cookies } from "next/headers";
import { User, users } from "./users";
import { redirect } from "next/navigation";

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

  cookies().set("currentUser", JSON.stringify(user), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1h
  });
  redirect("/dashboard");
}

export async function getSession() {
  const cookie = cookies().get("currentUser")?.value;
  return cookie ? JSON.parse(cookie) : null;
}

export async function logout() {
  cookies().delete("currentUser");
  redirect("/");
}
