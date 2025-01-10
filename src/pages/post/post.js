import styled from "styled-components";
import { H2 } from "../../components";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comments, PostContent, PostForm } from "./components";
import { useMatch, useParams } from "react-router-dom";
import { useServerRequest } from "../../hooks";
import { loadPostAsync, RESET_POST_DATA } from "../../actions";
import { selectPost } from "../../selectors";
import { initialPostState } from "../../reducers";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = useMatch("/post/:id/edit");
  const isCreating = useMatch("/post");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch]);

  useEffect(() => {
    if (isCreating) {
      return;
    }
    dispatch(loadPostAsync(requestServer, params.id));
  }, [dispatch, params.id, requestServer, isCreating]);

  return (
    <div className={className}>
      {isEditing || isCreating ? (
        <PostForm post={isCreating ? initialPostState : post} />
      ) : (
        <>
          <PostContent post={post} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  );
};

export const Post = styled(PostContainer)``;
