import { transformComment } from "../transformers";

export const getComments = (postId) =>
  fetch(`http://localhost:3001/comments?post_id=${postId}`).then(
    (loadedComments) =>
      loadedComments
        .json()
        .then(
          (loadedComments) =>
            loadedComments &&
            loadedComments.map((comment) => transformComment(comment)),
        ),
  );
