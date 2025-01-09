import styled from "styled-components";

export const IconButton = styled.button`
  font-size: 18px;
  padding: 5px 10px;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    & div {
      color: ${({ saveitem, disabled }) =>
        saveitem && !disabled ? "#4e7dd5" : "#ccc"};
      color: ${({ deleteitem }) => (deleteitem ? "#ca0000" : "")};
    }
  }
`;
