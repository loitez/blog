import styled from "styled-components";
import { ControlPanel, Logo } from "./components";

const Description = styled.div`
  font-style: italic;
`;

const HeaderContainer = ({ className }) => (
  <header className={className}>
    <Logo />
    <Description>
      Веб-технологии <br /> Написание кода <br />
      Разбор ошибок
    </Description>
    <ControlPanel />
  </header>
);

export const Header = styled(HeaderContainer)`
  //height: 120px;
  position: fixed;
  top: 0;
  width: 1040px;
  padding: 20px 40px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  z-index: 10;
`;
