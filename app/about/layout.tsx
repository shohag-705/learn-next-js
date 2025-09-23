import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description: "This is about us page",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="my-6">
        <ul className="flex gap-6">
          <li>
            <Link href={"/about/mission"}>Mission</Link>
          </li>
          <li>
            <Link href={"/about/vision"}>Vision</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
