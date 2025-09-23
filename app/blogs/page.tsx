import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  description: string;
};
export default function Blogs() {
  const blogs: Blog[] = [
    {
      id: 1,
      title: "Blog 1",
      description: "This is blog 1",
    },
    {
      id: 2,
      title: "Blog 2",
      description: "This is blog 2",
    },
  ];
  return (
    <main className="mt-6">
      <ul>
        {blogs.map((blog) => (
          <li className="mb-4" key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
