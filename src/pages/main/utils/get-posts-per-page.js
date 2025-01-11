export const getPostsPerPage = (posts, pageNumber, limit, searchPhrase) => {
  const startIndex = pageNumber === 1 ? 0 : limit;
  const lastIndex = limit * pageNumber;
  console.log(searchPhrase);
  if (searchPhrase === "") {
    return posts.slice(startIndex, lastIndex);
  }
  const searchedPosts = posts.filter(
    (post) => post.title.indexOf(searchPhrase) > 0,
  );
  return searchedPosts.slice(startIndex, lastIndex);
};
