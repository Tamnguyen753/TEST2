import jwt from 'jsonwebtoken'
const SECRET_KEY = "LTTT1102";
const verifyTokenMiddware = async (req, res, next) => {
    try {
        //check login 
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw Error('Token must be provided', 403)
        }
        const fields = authorization.split(' ');
        if (fields.length !== 2) {
            throw Error('Method auth is not support!')
        }
        const token = fields[1];
        const decoded = jwt.verify(token, SECRET_KEY)
        req.accountId = decoded.accountId;
        return next();
    } catch (error) {
        res.status(401).send({
            message: error.message,
            data: null
        });
        return;

    }
}
export default verifyTokenMiddware