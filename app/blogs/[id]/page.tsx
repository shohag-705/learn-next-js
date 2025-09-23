import { notFound } from "next/navigation";

export default function BlogPage({ params }: { params: { id: number } }) {
  const { id } = params;
  if (id == 3) {
    notFound();
  }
  return <h1 className="mt-4">BlogPage {id}</h1>;
}
