import mongoose from 'mongoose';
export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect('mongodb://test:test.123@ds245901.mlab.com:45901/todolist-app');

	const db = mongoose.connection;

	db.on('connected', () => {
		console.log('Connected to database');
	});

	db.on('disconnected', () => {
		console.log('Connection to database disconnected');
	});

	db.on('error', () => {
		console.log('Error occured while connecting to database');
	});

	callback(db);

};
