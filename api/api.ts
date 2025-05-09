export async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
}

export async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}

export async function fetchPostsForUser(userId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return response.json();
}

export async function fetchComments() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return response.json();
}

export async function fetchCommentsForPost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

export async function fetchAlbums() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  return response.json();
}

export async function fetchPhotosForAlbum(albumId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  );
  return response.json();
}

export async function fetchPhotos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  return response.json();
}

export async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}
