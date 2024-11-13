import styled from "styled-components";

const IconContainer = ({ className, id }) => (
  <div className={className}>
    <i className={`fa ${id}`} aria-hidden="true"></i>
  </div>
);

export const Icon = styled(IconContainer)`
  font-size: ${({ size = "25px" }) => size};
  margin: ${({ margin = "0" }) => margin};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};

  & > i {
    display: block;
  }
`;
