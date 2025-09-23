import jwt from "jsonwebtoken";
import { jwtVerify, SignJWT } from "jose";

const encoder = new TextEncoder();
export const runtime = "nodejs";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "accesstoken";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refreshtoken";

// export function generateAccessToken(payload: object) {
//   return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
//     expiresIn: "1m",
//   });
// }

// export function generateRefreshToken(payload: object) {
//   return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "2d" });
// }

export async function generateAccessToken(payload: object) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1m")
    .sign(encoder.encode(ACCESS_TOKEN_SECRET));
}

export async function generateRefreshToken(payload: object) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2d")
    .sign(encoder.encode(REFRESH_TOKEN_SECRET));
}

// export function verifyAccessToken(token: string) {
//   try {
//     console.log(
//       "verified access token [] : ",
//       jwt.verify(token, ACCESS_TOKEN_SECRET)
//     );
//     return jwt.verify(token, ACCESS_TOKEN_SECRET);
//   } catch (error) {
//     console.log("verifyAccessToken: ", error);
//     return null;
//   }
// }

// export function verifyRefreshToken(token: string) {
//   try {
//     console.log(
//       "verified access token [] : ",
//       jwt.verify(token, ACCESS_TOKEN_SECRET)
//     );
//     return jwt.verify(token, REFRESH_TOKEN_SECRET);
//   } catch (error) {
//     console.log("verifyAccessToken: ", error);
//     return null;
//   }
// }

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      encoder.encode(ACCESS_TOKEN_SECRET!)
    );
    return payload; // decoded claims
  } catch (e) {
    console.error("verifyAccessToken error:", e);
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      encoder.encode(REFRESH_TOKEN_SECRET!)
    );
    return payload;
  } catch (e) {
    console.error("verifyRefreshToken error:", e);
    return null;
  }
}
