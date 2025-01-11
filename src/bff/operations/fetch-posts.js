import { getComments, getPosts } from "../api";
import { getCommentsCount } from "../utils";

export const fetchPosts = async (searchPhrase) => {
  const [posts, comments] = await Promise.all([
    getPosts(searchPhrase),
    getComments(),
  ]);

  return {
    error: null,
    res: posts.map((post) => ({
      ...post,
      commentsCount: getCommentsCount(comments, post.id),
    })),
  };
};
