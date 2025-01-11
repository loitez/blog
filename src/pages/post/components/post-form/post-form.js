import styled from "styled-components";
import { Content, H2, Icon, IconButton, Input } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { useEffect, useRef, useState } from "react";
import { sanitizeContent } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../../../hooks";
import { savePostAsync } from "../../../../actions";
import { useNavigate } from "react-router-dom";
import { selectUserRole } from "../../../../selectors";
import { ROLE } from "../../../../constants";

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
  const roleId = useSelector(selectUserRole);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (roleId !== ROLE.ADMIN) {
      setErrorMessage("Доступ запрещен");
    }
  }, []);

  const onSave = () => {
    const newImageUrl = imageRef.current.value;
    const newTitle = titleRef.current.value;
    const newContent = sanitizeContent(contentRef.current.innerHTML);
    console.log("on save");
    console.log(newImageUrl, newTitle, newContent, id);
    dispatch(
      savePostAsync(requestServer, {
        id: id,
        imageUrl: newImageUrl,
        title: newTitle,
        content: newContent,
      }),
    ).then(({ id }) => navigate(`/post/${id}`));
  };

  return (
    <div className={className}>
      <Content error={errorMessage}>
        <Input
          ref={imageRef}
          defaultValue={imageUrl}
          placeholder="Изображение"
        />
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
      </Content>
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
    min-height: 80px;
    border: 1px solid #000;
    padding: 10px 15px;
    border-radius: 15px;
  }
`;
