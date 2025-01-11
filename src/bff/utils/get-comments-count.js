export const getCommentsCount = (comments = [], postIdForComments) => {
  const postComments = comments.filter(
    ({ postId: commentPostId }) => commentPostId === postIdForComments,
  );

  return postComments.length;
};
