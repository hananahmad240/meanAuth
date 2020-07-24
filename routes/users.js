const express = require('express');
const USER = require('../models/Users');
const User = require('../models/Users');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const protected = require('../middleware/auth');

// crete route
const router = express.Router();

// POST /users/register
router.post(
	'/register',
	asyncHandler(async (req, res, next) => {
		const newUser = await User.create(req.body);
		const token = newUser.getjwtToken();
		const options = {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};
		return res.status(200).cookie('TOKEN', token, options).json({
			success: true,
			data: newUser,
			token,
		});

		return next(error);
	})
);
// POST /users/login
router.post(
	'/login',
	asyncHandler(async (req, res, next) => {
		const {
			username,
			password
		} = req.body;
		console.log(password);


		const userLogin = await User.findOne({
			username
		});
		if (!userLogin) {
			return next(new ErrorResponse(`${username} is not register`, 404));
		} else {
			let isMatch = await userLogin.matchPassword(password);
			if (!isMatch) {
				return next(new ErrorResponse(`${password} is incorrect`, 404));
			} else {
				const token = userLogin.getjwtToken();
				const options = {
					expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
					httpOnly: true,
				};
				return res.status(200).cookie('TOKEN', token, options).json({
					success: true,
					data: userLogin,
					token,
				});
			}
		}

		return next(error);


	})
);

// GET /users/pofile
router.get('/profile', protected, (asyncHandler(async (req, res, next) => {
	res.status(200).json({
		success: true,
		data: req.user
	})
})))



module.exports = router;