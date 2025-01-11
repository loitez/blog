import PropTypes from "prop-types";
import { Error } from "../error/error";
import { selectUserRole } from "../../selectors";
import { useSelector } from "react-redux";
import { ERROR, PROP_TYPE } from "../../constants";
import { checkAccess } from "../../utils";

export const PrivateContent = ({ children, access, serverError = null }) => {
  const roleId = useSelector(selectUserRole);

  const accessError = checkAccess(access, roleId) ? null : ERROR.ACCESS_DENIED;
  const error = serverError || accessError;

  return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
  children: PropTypes.node.isRequired,
  access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
  serverError: PROP_TYPE.ERROR,
};
