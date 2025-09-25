import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import mime from "mime";

export const runtime = "nodejs";

export async function POST(req: Request) {
const cookieStore = cookies();
const token = cookieStore.get("accessToken")?.value;
if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const formData = await req.formData();
const file = formData.get("file") as File | null;
if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
}


const mimeType = mime.getType(file.name);
if (mimeType !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
}

const uploadDir = path.join(process.cwd(), "protected");
await fs.promises.mkdir(uploadDir, { recursive: true });

const arrayBuffer = await file.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

await fs.promises.writeFile(path.join(uploadDir, file.name), buffer);

return NextResponse.json({ ok: true, filename: file.name }, { status: 201 });
}
