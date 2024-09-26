import { useForm } from "react-hook-form";
import { useDispatch, useSelector, useStore } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Button, H2 } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants";

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните поле логин")
    .matches(/^\w+$/, "Неверный логин")
    .min(3, "Минимум 3 символа")
    .max(15, "Максимум 15 символов"),
  password: yup
    .string()
    .required("Заполните поле пароль")
    .matches(/^[\w#%]+$/, "Неверно заполнен пароль")
    .min(6, "Минимум 6 символа")
    .max(25, "Максимум 25 символов"),
});

const StyledLink = styled(Link)`
  text-decoration: underline;
  margin: 20px;
`;

const ErrorMessage = styled.div`
  background-color: #fcadad;
  padding: 10px;
  margin: 10px 0 0;
  width: 100%;
`;

const AuthorizationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const roleId = useSelector(selectUserRole);

  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();

  const store = useStore();

  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout;
    return store.subscribe(() => {
      let previousWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;

      if (currentWasLogout !== previousWasLogout) {
        reset();
      }
    });
  }, [reset, store]);

  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUser(res));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className={className}>
      <H2>Авторизация</H2>
      <StyledForm action="" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин"
          {...register("login", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Пароль"
          {...register("password", { onChange: () => setServerError(null) })}
        />
        <Button type="submit" disabled={!!formError} padding="10px 15px">
          Авторизоваться
        </Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <StyledLink to="/register">Регистрация</StyledLink>
      </StyledForm>
    </div>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 260px;
`;

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
