import { transformPost } from "../transformers";

export const getPost = (postId) =>
  fetch(`http://localhost:3001/posts/${postId}`).then((loadedPost) =>
    loadedPost
      .json()
      .then((loadedPost) => loadedPost && transformPost(loadedPost)),
  );