const jwt = require('jsonwebtoken');

/**
 * Authenticate middleware
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function authenticate(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    console.log(req.body)

    if (!token) return res.status(401).json({ message: 'Auth token is required!' });

    try {
        req.user = await jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token provided' });
    }
}

module.exports = authenticate;