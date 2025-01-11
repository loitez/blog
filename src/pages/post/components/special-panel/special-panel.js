import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon, IconButton } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../../actions";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../../hooks";
import { IconCalendar } from "../../../../components/icon/types";
import { selectUserRole } from "../../../../selectors";
import { ROLE } from "../../../../constants";
import { checkAccess } from "../../../../utils";

const SpecialPanelContainer = ({
  className,
  publishedAt,
  primaryButton,
  postId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();
  const userRole = useSelector(selectUserRole);

  const isAdmin = checkAccess([ROLE.ADMIN], userRole);

  const onDeleteArticle = () => {
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
          <IconCalendar />
          {publishedAt}
        </div>
      )}
      {isAdmin && (
        <div className="buttons">
          {primaryButton}
          {publishedAt && (
            <IconButton
              title="Удалить статью"
              deleteitem="deleteitem"
              onClick={onDeleteArticle}
            >
              <Icon size="21px" id="fa-trash-o" />
            </IconButton>
          )}
        </div>
      )}
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

SpecialPanel.propTypes = {
  publishedAt: PropTypes.string.isRequired,
  primaryButton: PropTypes.node.isRequired,
  postId: PropTypes.string.isRequired,
};
