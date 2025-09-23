export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
export default async function Comments({
  promise,
}: {
  promise: Promise<Comment[]>;
}) {
  const commnets: Comment[] = await promise;
  return (
    <>
      <h1 className="mt-6">Comments</h1>
      <ul>
        {commnets.map((comment) => (
          <li key={comment.id} className="bg-gray-200 px-4 py-4 m-2">
            {comment.body}
          </li>
        ))}
      </ul>
    </>
  );
}
