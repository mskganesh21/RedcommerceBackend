export const validateEmail = (email) => {
     const EMAIL_REGEX = /^[a-zA-Z0-9._-]{6,}@(?:gmail\.com|yahoo\.com)$/;
    return EMAIL_REGEX.test(email);
}