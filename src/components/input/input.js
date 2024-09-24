import styled from "styled-components";

const InputContainer = ({ className, width, ...props }) => {
  return <input className={className} type="text" {...props} />;
};

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
