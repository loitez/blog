import styled from "styled-components";
import { Icon, IconButton } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_MODAL,
  openModal,
  removeCommentAsync,
} from "../../../../../actions";
import { useServerRequest } from "../../../../../hooks";
import { checkAccess } from "../../../../../utils";
import { ROLE } from "../../../../../constants";
import { selectUserRole } from "../../../../../selectors";

const CommentContainer = ({
  className,
  postId,
  id,
  author,
  content,
  publishedAt,
}) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const userRole = useSelector(selectUserRole);
  const isAdmin = checkAccess([ROLE.ADMIN], userRole);
  const isModerator = checkAccess([ROLE.MODERATOR], userRole);

  const onCommentRemove = (commentId, postId) => {
    dispatch(
      openModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, commentId, postId));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      }),
    );
  };

  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon margin="0 10px 0 0" size="18px" id="fa-user-circle-o" />
            {author}
          </div>
          <div className="published-at">
            <Icon margin="0 10px 0 0" size="18px" id="fa-calendar-o" />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      {(isAdmin || isModerator) && (
        <IconButton
          title="Удалить комментарий"
          deleteitem
          onClick={() => onCommentRemove(id, postId)}
        >
          <Icon size="20px" id="fa-trash-o" />
        </IconButton>
      )}
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  & .comment {
    border: 1px solid #000;
    padding: 7px 10px;
    width: 100%;
  }

  & .information-panel {
    display: flex;
    justify-content: space-between;

    & .author,
    .published-at {
      display: flex;
      justify-content: center;
    }
  }
`;
