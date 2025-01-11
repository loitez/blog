export const getLastPage = (posts, limit) => {
  return Math.ceil(posts.length / limit);
};
