import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Header, Footer, Modal } from "./components";
import { Authorization, Registration, Users } from "./pages";
import { Post } from "./pages";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";

const Page = styled.div`
  padding: 120px 80px;
`;

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
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
          <Route path="/" element={<div>Главная</div>}></Route>
          <Route path="/login" element={<Authorization />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/post" element={<div>Новая статья</div>}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="*" element={<div>Ошибка</div>}></Route>
        </Routes>
      </Page>
      <Footer></Footer>
      <Modal />
    </AppColumn>
  );
};
