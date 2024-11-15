import styled from "styled-components";

const CommentsContainer = ({ className, comments }) => {
  return <div className={className}>{comments}</div>;
};

export const Comments = styled(CommentsContainer)``;
