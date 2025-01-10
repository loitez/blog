import styled from "styled-components";
import { Icon, IconButton } from "../../../../components";
import { useDispatch } from "react-redux";
import {
  CLOSE_MODAL,
  openModal,
  removePostAsync,
  removeCommentAsync,
  savePostAsync,
} from "../../../../actions";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../../hooks";

const SpecialPanelContainer = ({
  className,
  publishedAt,
  primaryButton,
  postId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const onDeleteArticle = () => {
    console.log("deleting");

    dispatch(
      openModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(requestServer, postId)).then(() =>
            navigate("/"),
          );
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      }),
    );
  };

  return (
    <div className={className}>
      {publishedAt && (
        <div className="published-at">
          <Icon margin="0 10px 0 0" size="18px" id="fa-calendar-o" />
          {publishedAt}
        </div>
      )}

      <div className="buttons">
        {primaryButton}
        {publishedAt && (
          <IconButton
            title="Удалить статью"
            deleteitem
            onClick={onDeleteArticle}
          >
            <Icon size="21px" id="fa-trash-o" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  margin-bottom: 20px;
  font-size: 19px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .published-at {
    display: flex;
    align-items: center;
  }
  & .buttons {
    margin-left: auto;
  }
`;
