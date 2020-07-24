const mongoose = require('mongoose');
const mongoURI = require('./mongoURI').mongoURI;
const connectedDB = async () => {
	const connected = await mongoose.connect(mongoURI, {
		useUnifiedTopology: true,
		useFindAndModify: true,
		useCreateIndex: true,
		useNewUrlParser: true
	});

	console.log(`${connected.connection.host}`.underline);
}

module.exports = connectedDB;