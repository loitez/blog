import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = ({ className, children, width, padding, ...props }) => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
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
    cursor: pointer;
  }
  &:disabled {
    &:hover {
      background-color: #e3e3e3;
      cursor: not-allowed;
    }
  }
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  padding: PropTypes.string,
};
