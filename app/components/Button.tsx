"use client";
export default function Button() {
  return (
    <button
      className="bg-green-300 px-4 py-2 rounded-xl"
      onClick={() => console.log("clicked here")}
    >
      Click me
    </button>
  );
}
