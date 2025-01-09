export const transformComment = (comment) => ({
  id: comment.id,
  author: comment.author,
  postId: comment.post_id,
  content: comment.content,
  publishedAt: comment.published_at,
});
