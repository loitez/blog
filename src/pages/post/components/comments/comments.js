import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { addCommentAsync } from "../../../../actions";
import { Icon, IconButton } from "../../../../components";
import { Comment } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectUserRole } from "../../../../selectors";
import { useServerRequest } from "../../../../hooks";
import { checkAccess } from "../../../../utils";
import { PROP_TYPE, ROLE } from "../../../../constants";

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const userRole = useSelector(selectUserRole);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const isGuest = checkAccess([ROLE.GUEST], userRole);

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(requestServer, userId, postId, content));
    setNewComment("");
  };

  return (
    <div className={className}>
      {!isGuest && (
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
      )}

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

Comments.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
  postId: PropTypes.string.isRequired,
};
