import styled from "styled-components";
import { Icon } from "../../../../components";
import { Link } from "react-router-dom";

const LogoLargeText = styled.div`
  font-size: 55px;
  font-weight: 500;
  line-height: 1;
`;

const LogoSmallText = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const LogoContainer = ({ className }) => (
  <Link className={className} to="/">
    <Icon size="70px" margin="0 20px 0 0" id="fa-code" />
    <div>
      <LogoLargeText>Блог</LogoLargeText>
      <LogoSmallText>Веб-разработчика</LogoSmallText>
    </div>
  </Link>
);

export const Logo = styled(LogoContainer)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;
