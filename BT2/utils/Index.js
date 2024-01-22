import jwt from 'jsonwebtoken';
const SECRET_KEY = "LTTT1102";

const getToken = (data) => {
    const token = jwt.sign(data, SECRET_KEY, {
        expiresIn: 1000 * 60 * 3
    });
    console.log(token);
    return token;
};

export default getToken