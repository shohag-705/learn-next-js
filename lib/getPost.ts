export async function getPost(id: number) {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return resp.json();
}
