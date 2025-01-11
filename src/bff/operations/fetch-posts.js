import { getComments, getPosts } from "../api";
import { getCommentsCount } from "../utils";

export const fetchPosts = async (page, limit) => {
  const [{ posts, lastPage }, comments] = await Promise.all([
    getPosts(page, limit),
    getComments(),
  ]);
  console.log(posts);
  console.log(lastPage);

  return {
    error: null,
    res: {
      posts: posts.map((post) => ({
        ...post,

        commentsCount: getCommentsCount(comments, post.id),
      })),
      lastPage,
    },
  };
};
