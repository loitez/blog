import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonContainer = ({ className, children, width, padding, ...props }) => {
  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
};

export const Button = styled(ButtonContainer)`
  width: ${({ width = "100%" }) => width};
  text-align: center;
  font-size: 18px;
  padding: ${({ padding = "5px 10px" }) => padding};
  border-radius: 20px;
  border: 1px solid black;
  margin-bottom: 5px;
  background-color: #e3e3e3;

  &:hover {
    background-color: transparent;
  }
`;
