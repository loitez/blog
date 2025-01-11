import { Error } from "../error/error";
import { selectUserId, selectUserRole } from "../../selectors";
import { useSelector } from "react-redux";
import { ERROR } from "../../constants";
import { checkAccess } from "../../utils";

export const PrivateContent = ({ children, access, serverError = null }) => {
  const roleId = useSelector(selectUserRole);

  const accessError = checkAccess(access, roleId) ? null : ERROR.ACCESS_DENIED;
  const error = serverError || accessError;

  return error ? <Error error={error} /> : children;
};
