import { transformPost } from "../transformers";

export const getPosts = (searchPhrase) => {
  return fetch(`http://localhost:3001/posts`).then((loadedPosts) =>
    loadedPosts.json().then((loadedPosts) => {
      console.log(loadedPosts);
      return loadedPosts && loadedPosts.map(transformPost);
    }),
  );
};
