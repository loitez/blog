import styled from "styled-components";
import { H2, Icon, IconButton } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { useNavigate } from "react-router-dom";
import { PROP_TYPE } from "../../../../constants";

const PostContentContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <img src={imageUrl} alt={title} />
      <H2>{title}</H2>
      <SpecialPanel
        publishedAt={publishedAt}
        primaryButton={
          <IconButton
            title="Редактировать статью"
            onClick={() => navigate(`/post/${id}/edit`)}
          >
            <Icon size="21px" id="fa-pencil-square-o" />
          </IconButton>
        }
        postId={id}
      />
      <div className="post-text">{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContentContainer)`
  margin: 40px 0;
  & img {
    float: left;
    margin: 0 20px 10px 0;
    width: 280px;
    height: 150px;
    object-fit: cover;
  }
  & .post-text {
    white-space: pre-line;
  }
`;

PostContent.propTypes = {
  post: PROP_TYPE.POST.isRequired,
};
