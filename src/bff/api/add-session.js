export const addSession = (hash, user) =>
  fetch("http://localhost:3001/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({
      hash,
      user: {
        author_id: user.id,
        login: user.login,
        password: user.password,
        registered_at: user.registeredAt,
        role_id: user.roleId,
      },
    }),
  });
