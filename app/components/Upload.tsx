"use client";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    console.log("fd", fd.getAll("file"));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    const json = await res.json();
    alert(JSON.stringify(json));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
