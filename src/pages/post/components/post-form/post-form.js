import styled from "styled-components";
import { H2, Icon, IconButton, Input } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { useRef } from "react";
import { sanitizeContent } from "./utils";
import { useDispatch } from "react-redux";
import { useServerRequest } from "../../../../hooks";
import { savePostAsync } from "../../../../actions";
import { useNavigate } from "react-router-dom";

const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const navigate = useNavigate();

  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const onSave = () => {
    const newImageUrl = imageRef.current.value;
    const newTitle = titleRef.current.value;
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id: id,
        imageUrl: newImageUrl,
        title: newTitle,
        content: newContent,
      }),
    ).then(() => navigate(`/post/${id}`));
  };

  return (
    <div className={className}>
      <Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение" />
      <Input ref={titleRef} defaultValue={title} placeholder="Заголовок" />
      <SpecialPanel
        publishedAt={publishedAt}
        primaryButton={
          <IconButton title="Сохранить статью" onClick={onSave}>
            <Icon size="21px" id="fa-floppy-o" />
          </IconButton>
        }
        postId={id}
      />
      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="post-text"
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  margin: 40px 0;
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }
  & .post-text {
    white-space: pre-line;
  }
`;
