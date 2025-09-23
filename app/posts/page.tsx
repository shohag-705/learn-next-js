import { getPosts } from "@/lib/getPosts";
import Link from "next/link";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function Posts() {
  const posts = await getPosts();
  return (
    <div>
      <h1>All posts</h1>
      <ul className="mt-6">
        {posts.map((post: Post) => (
          <li key={post.id} className="cursor-pointer">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
