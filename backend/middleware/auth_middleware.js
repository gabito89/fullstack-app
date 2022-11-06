const jwt=require('jsonwebtoken');
const status_HTTP=require('../constantes/http_status.js');

const verify = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(status_HTTP.HTTP_UNAUTHORIZED).send();

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        res.status(status_HTTP.HTTP_UNAUTHORIZED).send();
    }    
}

module.exports={verify}