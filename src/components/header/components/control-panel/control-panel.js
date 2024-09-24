import styled from "styled-components";
import { Icon, Button } from "../../../../components";
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

const IconButton = styled.button`
  font-size: 18px;
  padding: 5px 10px;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const ControlPanelContainer = (className) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <RightAligned>
        <Button to="/login">Войти</Button>
      </RightAligned>
      <RightAligned>
        <IconButton onClick={() => navigate(-1)}>
          <Icon size="25px" id="fa-backward" />
        </IconButton>
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
