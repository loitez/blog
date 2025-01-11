import styled from "styled-components";
import { PrivateContent, Error } from "../../components";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comments, PostContent, PostForm } from "./components";
import { useMatch, useParams } from "react-router-dom";
import { useServerRequest } from "../../hooks";
import { loadPostAsync, RESET_POST_DATA } from "../../actions";
import { selectPost, selectUserRole } from "../../selectors";
import { initialPostState } from "../../reducers";
import { ROLE } from "../../constants";
import { checkAccess } from "../../utils";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = useMatch("/post/:id/edit");
  const isCreating = useMatch("/post");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }
    dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
      setError(postData.error);
      setIsLoading(false);
    });
  }, [dispatch, params.id, requestServer, isCreating]);

  if (isLoading) {
    return null;
  }

  const SpecificPostPage =
    isEditing || isCreating ? (
      <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
        <div className={className}>
          <PostForm post={isCreating ? initialPostState : post} />
        </div>
      </PrivateContent>
    ) : (
      <div className={className}>
        <PostContent post={post} />
        <Comments comments={post.comments} postId={post.id} />
      </div>
    );

  return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)``;
