export const setUserRole = (userId, roleId) =>
  fetch(`http://localhost:3001/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({
      role_id: roleId,
    }),
  });
