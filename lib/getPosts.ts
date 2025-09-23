export async function getPosts() {
  const resp = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );

  // if (!resp.ok) {
  //   throw new Error("Error fetching all the data");
  // }

  return resp.json();
}
