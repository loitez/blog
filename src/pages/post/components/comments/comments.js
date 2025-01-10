import styled from "styled-components";
import { useState } from "react";
import { addCommentAsync, logout } from "../../../../actions";
import { Icon, IconButton } from "../../../../components";
import { Comment } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../../selectors";
import { useServerRequest } from "../../../../hooks";

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(requestServer, userId, postId, content));
    setNewComment("");
  };

  return (
    <div className={className}>
      <div className="new-comment">
        <textarea
          name="comment"
          value={newComment}
          placeholder="Комментарий..."
          onChange={({ target }) => setNewComment(target.value)}
        ></textarea>
        <IconButton
          title="Добавить комментарий"
          onClick={() => onNewCommentAdd(userId, postId, newComment)}
        >
          <Icon size="20px" id="fa-paper-plane-o" />
        </IconButton>
      </div>
      <div className={comments}>
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            postId={postId}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  max-width: 550px;
  width: 100%;
  margin: 0 auto;
  & .new-comment {
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    & textarea {
      width: 100%;
      height: 180px;
      padding: 10px;
      font-size: 16px;
      margin-bottom: 30px;
      border-color: #000;
    }
  }
`;
