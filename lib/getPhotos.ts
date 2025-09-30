export async function getPhotos() {
  const resp = await fetch("http://localhost:3001/photos");
  return resp.json();
}
