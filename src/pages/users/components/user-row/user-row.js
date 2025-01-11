import PropTypes from "prop-types";
import { Icon, IconButton } from "../../../../components";
import styled from "styled-components";
import { useState } from "react";
import { useServerRequest } from "../../../../hooks";
import { PROP_TYPE } from "../../../../constants";

const UserRowContainer = ({
  className,
  id,
  login,
  registeredAt,
  roleId: userRoleId,
  roles,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
  const requestServer = useServerRequest();

  const onRoleSave = (userId, newUserRoleId) => {
    requestServer("updateUserRole", userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };
  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  return (
    <div className={className}>
      <div>{login}</div>
      <div>{registeredAt}</div>
      <div>
        <select name="" id="" value={selectedRoleId} onChange={onRoleChange}>
          {roles.map(({ id: roleId, name: roleName }) => (
            <option value={roleId} key={roleId}>
              {roleName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <IconButton
          title="Сохранить пользователя"
          onClick={() => onRoleSave(id, selectedRoleId)}
          saveitem="saveitem"
          disabled={isSaveButtonDisabled}
        >
          <Icon size="25px" id="fa-floppy-o" disabled={isSaveButtonDisabled} />
        </IconButton>
        <IconButton
          title="Удалить пользователя"
          deleteitem="deleteitem"
          onClick={onUserRemove}
        >
          <Icon size="25px" id="fa-trash-o" />
        </IconButton>
      </div>
    </div>
  );
};

export const UserRow = styled(UserRowContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  margin: 5px 0;
  & > div {
    width: 170px;
    padding: 0 10px;
    &:last-of-type {
      width: 105px;
    }
  }
  & select {
    font-size: 16px;
    padding: 3px;
  }
`;

UserRow.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  registeredAt: PropTypes.string.isRequired,
  roleId: PROP_TYPE.ROLE_ID,
  roles: PropTypes.arrayOf(PROP_TYPE.ROLE),
  onUserRemove: PropTypes.func.isRequired,
};
