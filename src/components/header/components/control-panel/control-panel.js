import styled from "styled-components";
import { Icon } from "../../../icon/icon";
import { Link, useNavigate } from "react-router-dom";

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
`;

const StyledIconLink = styled(Link)`
  font-size: 18px;
  padding: 5px 10px;
  background-color: transparent;
  outline: none;
  border: none;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 5px 10px;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const StyledMainLink = styled(Link)`
  font-size: 18px;
  padding: 5px 15px;
  border-radius: 20px;
  border: 1px solid black;
  margin-bottom: 5px;
  background-color: #eee;
  &:hover {
    background-color: transparent;
  }
`;

const ControlPanelContainer = (className) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <RightAligned>
        <StyledMainLink to="/login">Войти</StyledMainLink>
      </RightAligned>
      <RightAligned>
        <Button onClick={() => navigate(-1)}>
          <Icon size="25px" id="fa-backward" />
        </Button>
        <StyledIconLink to="/post">
          <Icon size="20px" id="fa-file-text-o" />
        </StyledIconLink>
        <StyledIconLink to="/users">
          <Icon size="20px" id="fa-users" />
        </StyledIconLink>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
