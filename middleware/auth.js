const jwtToekn = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/Users');
const asyncHandler = require('./async');

const protected = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization;
    } else if (req.cookies.TOKEN) {
        token = req.cookies.TOKEN;
    }

    if (!token) {
        return next(new ErrorResponse(`not authoriza to access this route`), 404);
    } else {
        try {
            const decode = jwtToekn.verify(token, process.env.SECRET);
            console.log(decode);
            req.user = await User.findById(decode.id);
            next();
        } catch (error) {
            return next(new ErrorResponse(`no authorize`), 404);
        }

    }
});
module.exports = protected;