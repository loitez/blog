import styled from "styled-components";
import { useEffect, useState } from "react";
import { useServerRequest } from "../../hooks";
import { H2 } from "../../components";
import { Pagination, PostCard } from "./components";
import { PAGINATION_LIMIT } from "../../constants";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const requestServer = useServerRequest();

  console.log(page);

  useEffect(() => {
    console.log(page, PAGINATION_LIMIT);
    Promise.all([requestServer("fetchPosts", page, PAGINATION_LIMIT)]).then(
      ([data]) => {
        if (data.error) {
          setErrorMessage(data.error);
          return;
        }
        console.log(posts);
        setPosts(data.res.posts);
        setLastPage(data.res.lastPage);
      },
    );
  }, [requestServer, page]);

  return (
    <div className={className}>
      <div className="post-list">
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
      {lastPage > 1 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  //padding: 40px 0;
  & .post-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }
`;
