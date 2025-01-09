import { generateDate } from "../utils";

export const addComment = (userId, postId, content) =>
  fetch("http://localhost:3001/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({
      author: userId,
      post_id: postId,
      published_at: generateDate(),
      content: content,
    }),
  });
