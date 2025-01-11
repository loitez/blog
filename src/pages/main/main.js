import styled from "styled-components";
import { useEffect, useState } from "react";
import { useServerRequest } from "../../hooks";
import { H2 } from "../../components";
import { PostCard } from "./components";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(false);

  const requestServer = useServerRequest();

  useEffect(() => {
    Promise.all([requestServer("fetchPosts")]).then(([posts]) => {
      if (posts.error) {
        setErrorMessage(posts.error);
        return;
      }
      console.log(posts);
      setPosts(posts.res);
    });
  }, [requestServer, shouldUpdatePosts]);

  return (
    <div className={className}>
      {posts.map(({ id, imageUrl, publishedAt, title, commentsCount }) => (
        <PostCard
          key={id}
          id={id}
          title={title}
          publishedAt={publishedAt}
          imageUrl={imageUrl}
          commentsCount={commentsCount}
        />
      ))}
    </div>
  );
};

export const Main = styled(MainContainer)`
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
