export const validatePassword = (email) => {
     const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
   return PWD_REGEX.test(email);
}