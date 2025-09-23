import Comments, { Comment } from "@/app/components/Comments";
import { getPost } from "@/lib/getPost";
import getPostComments from "@/lib/getPostComments";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.body,
  };
}

export default async function PostPage({ params }: { params: { id: number } }) {
  const postPromise = getPost(params.id);
  const commentsPromise: Promise<Comment[]> = getPostComments(params.id);
  const post = await postPromise;
  return (
    <>
      <h2 className="text-blue-400 mt-6">{post.title}</h2>
      <p>{post.body}</p>
      <Suspense fallback={<p>Loading comments...</p>}>
        <Comments promise={commentsPromise} />
      </Suspense>
    </>
  );
}
