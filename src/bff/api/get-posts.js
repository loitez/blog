import { transformPost } from "../transformers";

export const getPosts = (page, limit) => {
  console.log(`http://localhost:3001/posts?_page=${page}&_per_page=${limit}`);
  return fetch(
    `http://localhost:3001/posts?_page=${page}&_per_page=${limit}`,
  ).then((loadedPosts) =>
    loadedPosts.json().then((loadedPosts) => {
      return {
        posts:
          loadedPosts.data &&
          loadedPosts.data.map((post) => transformPost(post)),
        lastPage: loadedPosts.last,
      };
    }),
  );
};

//
