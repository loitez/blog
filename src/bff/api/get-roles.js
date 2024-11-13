import { transformRole } from "../transformers";

export const getRoles = () =>
  fetch("http://localhost:3001/roles").then((loadedRoles) =>
    loadedRoles
      .json()
      .then(
        (loadedRoles) =>
          loadedRoles && loadedRoles.map((role) => transformRole(role)),
      ),
  );
