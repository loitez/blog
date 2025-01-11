import styled from "styled-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerRequest } from "../../hooks";
import { H2 } from "../../components";
import { Pagination, PostCard, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce, getLastPage, getPostsPerPage } from "./utils";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const requestServer = useServerRequest();
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  useEffect(() => {
    Promise.all([requestServer("fetchPosts", searchPhrase)]).then(([data]) => {
      if (data.error) {
        setErrorMessage(data.error);
        return;
      }
      const postsPerPage = getPostsPerPage(
        data.res,
        page,
        PAGINATION_LIMIT,
        searchPhrase,
      );
      const lastPageNumber = getLastPage(data.res, PAGINATION_LIMIT);
      setPosts(postsPerPage);
      setLastPage(lastPageNumber);
    });
  }, [requestServer, page, shouldSearch]);

  return (
    <div className={className}>
      <Search onChange={onSearch} searchPhrase={searchPhrase} />
      {posts.length > 0 ? (
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
      ) : (
        <div>Ничего не найдено</div>
      )}
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
