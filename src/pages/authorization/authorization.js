import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "../../components";

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните поле логин")
    .matches(/\w+$/, "Неверный логин")
    .min(3, "Минимум 3 символа")
    .max(15, "Максимум 15 символов"),
  password: yup
    .string()
    .required("Заполните поле пароль")
    .matches(/^[\w#%]+$/, "Неверно заполнен пароль")
    .min(6, "Минимум 6 символа")
    .max(25, "Максимум 25 символов"),
});

const AuthorizationContainer = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState("");

  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then((error, response) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
      }
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;

  const errorMessage = formError || serverError;

  return (
    <div className={className}>
      <h2>Авторизация</h2>
      <StyledForm action="" onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Логин" {...register("login")} />
        <Input type="password" placeholder="Пароль" {...register("password")} />
        <Button type="submit" disabled={!!formError} padding="10px 15px">
          Войти
        </Button>
        {errorMessage && <div>{errorMessage}</div>}
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
