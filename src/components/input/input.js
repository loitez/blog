import PropTypes from "prop-types";
import styled from "styled-components";
import { forwardRef } from "react";

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
  return <input className={className} type="text" {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
  width: ${({ width = "100%" }) => width};
  font-size: 18px;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 20px;
  outline: none;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    background-color: #f6f6f6;
  }
`;

Input.propTypes = {
  width: PropTypes.string,
};
