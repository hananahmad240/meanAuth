const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const connectedDB = require('./config/db');
const errHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

// creat app
const app = express();
// create static path for index and css js images
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cors());
app.use(cookieParser());

// databse connected
connectedDB();

// creat route
app.use('/users', require('./routes/users'));
// error handler middleware
app.use(errHandler);
// create PORT
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
	console.log(`app is running on localhost ${PORT}`);
});

process.on('unhandledRejection', (err, message) => {
	console.log(`${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});