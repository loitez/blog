import styled from "styled-components";
import { PrivateContent, H2 } from "../../components";
import { UserRow } from "./components";
import { useServerRequest } from "../../hooks";
import { useEffect, useState } from "react";
import { ROLE } from "../../constants";
import { checkAccess } from "../../utils";
import { selectUserRole } from "../../selectors";
import { useSelector } from "react-redux";

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);
  const userRole = useSelector(selectUserRole);

  const requestServer = useServerRequest();

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    Promise.all([
      requestServer("fetchUsers"),
      requestServer("fetchRoles"),
    ]).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }
      setUsers(usersRes.res);
      setRoles(rolesRes.res);
    });
  }, [requestServer, shouldUpdateUsers, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    requestServer("removeUser", userId).then(() => {
      setShouldUpdateUsers(!shouldUpdateUsers);
    });
  };

  return (
    <div className={className}>
      <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
        <H2>Пользователи</H2>
        <div>
          <div className="table-header">
            <div>Логин</div>
            <div>Дата регистрации</div>
            <div>Роль</div>
          </div>
          {users.map(({ id, login, registeredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registeredAt={registeredAt}
              roleId={roleId}
              roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            ></UserRow>
          ))}
        </div>
      </PrivateContent>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & .table-header {
    display: flex;
    // justify-content: space-between;
    margin-bottom: 10px;

    & > div {
      width: 170px;
      padding: 0 10px;
    }
  }
`;
