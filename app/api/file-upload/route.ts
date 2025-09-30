// app/api/file-upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    console.log("got the file", file.name, file.size, file.type);

    // Convert file to buffer

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file to public/uploads directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);

    // Save file info to your JSON server
    const fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      path: `/uploads/${file.name}`,
      uploadedAt: new Date().toISOString(),
    };

    // Post to your JSON server
    const response = await fetch("http://localhost:3001/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fileInfo),
    });
    console.log(response);

    return NextResponse.json({
      message: "File uploaded successfully",
      file: fileInfo,
    });
  } catch (error) {
    console.log("image upload error", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
