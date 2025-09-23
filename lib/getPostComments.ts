export default async function getPostComments(id: number) {
  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  return comments.json();
}
