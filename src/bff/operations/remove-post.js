import {
  addComment,
  deletePost,
  deleteComment,
  getComments,
  getPost,
  getUsers,
} from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const removePost = async (hash, postId) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  await deletePost(postId);

  const comments = await getComments(postId);

  await Promise.all(
    comments.map(({ id: commentId }) => deleteComment(commentId)),
  );

  return {
    error: null,
    res: true,
  };
};
