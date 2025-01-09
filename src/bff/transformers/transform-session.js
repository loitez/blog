export const transformSession = (session) => ({
  id: session.id,
  hash: session.hash,
  user: {
    authorId: session.user.id,
    login: session.user.login,
    password: session.user.password,
    registeredAt: session.user.registered_at,
    roleId: session.user.role_id,
  },
});
