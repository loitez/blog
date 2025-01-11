import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Header, Footer, Modal, Error } from "./components";
import { Authorization, Main, Registration, Users } from "./pages";
import { Post } from "./pages";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
import { ERROR } from "./constants";

const Page = styled.div`
  margin-top: 120px;
  padding: 40px 80px;
`;

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1040px;
  background-color: #fff;
  min-height: 100vh;
  margin: 0 auto;
`;

export const Blog = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }),
    );
  }, [dispatch]);

  return (
    <AppColumn>
      <Header></Header>
      <Page>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Authorization />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/post" element={<Post />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/post/:id/edit" element={<Post />}></Route>
          <Route
            path="*"
            element={<Error error={ERROR.PAGE_NOT_EXIST} />}
          ></Route>
        </Routes>
      </Page>
      <Footer></Footer>
      <Modal />
    </AppColumn>
  );
};
