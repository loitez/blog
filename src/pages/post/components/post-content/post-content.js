import styled from "styled-components";
import { H2, Icon, IconButton } from "../../../../components";

const PostContentContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  return (
    <div className={className}>
      <img src={imageUrl} alt={title} />
      <H2>{title}</H2>
      <div className="special-panel">
        <div className="published-at">
          <Icon margin="0 10px 0 0" size="18px" id="fa-calendar-o" />
          {publishedAt}
        </div>
        <div>
          <IconButton title="Редактировать статью">
            <Icon size="21px" id="fa-pencil-square-o" />
          </IconButton>
          <IconButton title="Удалить статью" deleteitem>
            <Icon size="21px" id="fa-trash-o" />
          </IconButton>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContentContainer)`
  margin: 40px 0;
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }
  & .special-panel {
    margin-bottom: 20px;
    font-size: 19px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .published-at {
    display: flex;
    align-items: center;
  }
`;
