const jwt = require('jsonwebtoken');
/*
Extracts the JWT from the Authorization header.
Verifies the token using jwt.verify.
Adds the decoded user data to the request object.
Calls next() to pass control to the next middleware if the token is valid.
Sends a 401 error response if token verification fails.
*/
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};

module.exports = authenticate;
