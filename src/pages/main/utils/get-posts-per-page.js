export const getPostsPerPage = (posts, pageNumber, limit, searchPhrase) => {
  const startIndex = pageNumber === 1 ? 0 : limit;
  const lastIndex = limit * pageNumber;
  if (searchPhrase === "") {
    return posts.slice(startIndex, lastIndex);
  }
  const searchedPosts = posts.filter(
    (post) =>
      post?.title?.toLowerCase().indexOf(searchPhrase?.toLowerCase()) >= 0,
  );
  return searchedPosts.slice(startIndex, lastIndex);
};
