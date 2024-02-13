export const generateRandomString = () => {
    const timeStamp = new Date().getTime().toString(16);
    const randomPart = Math.random().toString(16).substring(2,8);

    const uniqueString = timeStamp + randomPart;

    return uniqueString.substring(0,16);
}