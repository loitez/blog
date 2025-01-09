import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Button, IconButton } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { ROLE } from "../../../../constants";
import {
  selectUserLogin,
  selectUserRole,
  selectUserSession,
} from "../../../../selectors";
import { logout } from "../../../../actions";

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledIconLink = styled(Link)`
  font-size: 18px;
  padding: 5px 10px;
  background-color: transparent;
  outline: none;
  border: none;
`;

const UserName = styled.div`
  font-weight: 700;
`;

const ControlPanelContainer = (className) => {
  const navigate = useNavigate();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout(session));
    sessionStorage.removeItem("userData");
  };

  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <IconButton onClick={onLogout} title="Выйти">
              <Icon size="20px" id="fa-sign-out" />
            </IconButton>
          </>
        )}
      </RightAligned>
      <RightAligned>
        <IconButton onClick={() => navigate(-1)} title="Назад">
          <Icon size="25px" id="fa-caret-left" />
        </IconButton>
        <StyledIconLink to="/post" title="Создать статью">
          <Icon size="20px" id="fa-file-text-o" />
        </StyledIconLink>
        <StyledIconLink to="/users" title="Все пользователи">
          <Icon size="20px" id="fa-users" />
        </StyledIconLink>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
