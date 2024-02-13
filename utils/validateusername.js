export const validateUsername = (name) => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  return USER_REGEX.test(name);
};
