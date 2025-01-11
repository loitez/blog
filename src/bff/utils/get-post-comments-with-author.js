import { getComments, getUsers } from "../api";

export const getPostCommentsWithAuthor = async (postId) => {
  const comments = await getComments(postId);

  const users = await getUsers();

  return comments.map((comment) => {
    const user = users.find(({ id }) => id === comment.author);

    return {
      ...comment,
      author: user?.login,
    };
  });
};
