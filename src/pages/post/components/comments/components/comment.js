import styled from "styled-components";
import { Icon, IconButton } from "../../../../../components";

const CommentContainer = ({ className, id, author, content, publishedAt }) => {
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
      <IconButton title="Удалить комментарий" deleteitem>
        <Icon size="20px" id="fa-trash-o" />
      </IconButton>
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
