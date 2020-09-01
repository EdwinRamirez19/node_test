const jwt = require('jsonwebtoken');
const secret = 'testnodejs';
const validate_jwt = async(req, res, next) => {
    const token = req.headers['xxx-access-token'] || req.headers['authorization'];
    if (!token) {
        if (!req.body.token) {
            return res.json({
                ok: false,
                message: 'Acceso denegado, no se ha proporcionado el token'
            })
        } else {
            token = req.body.token;
        }
    }

    try {
        jwt.verify(token, secret, (err, res) => {
            if (!res) return res.status(401).json({ message: 'El token Expiro' });
            req.user = res.user;
            next();
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ menssge: 'Token Invalido' });
    }
}

module.exports = validate_jwt;