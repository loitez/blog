import styled from "styled-components";
import { IconCalendar } from "../../../../components/icon/types";
import { Icon } from "../../../../components";
import { Link } from "react-router-dom";
import { useState } from "react";

const PostCardContainer = ({
  className,
  id,
  title,
  publishedAt,
  imageUrl,
  commentsCount,
}) => {
  return (
    <Link className={className} to={`/post/${id}`}>
      <img src={imageUrl} alt={title} />
      <div className="post-info">
        <div className="post-title">{title}</div>
        <div className="post-meta">
          <div className="published-at">
            <IconCalendar />
            {publishedAt}
          </div>
          <div className="comments-count">
            <Icon margin="0 10px 0 0" size="18px" id="fa-comment-o" />
            {commentsCount}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const PostCard = styled(PostCardContainer)`
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & img {
    display: block;
  }
  & .post-info {
    padding: 7px 5px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top: 1px solid #000;
  }
  & .post-title {
    font-weight: bold;
    margin-bottom: 7px;
  }
  & .post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .published-at,
  .comments-count {
    display: flex;
    align-items: center;
  }
  & i {
    font-size: 15px;
  }
`;
