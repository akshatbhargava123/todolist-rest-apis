import mongoose from 'mongoose';
export default callback => {

	// This is hardcoded for now, username and password of db should be in env variables
	mongoose.connect('mongodb://test:test.123@ds245901.mlab.com:45901/todolist-app');

	const db = mongoose.connection;

	db.on('connected', () => {
		console.log('Connected to database');
	});

	db.on('disconnected', () => {
		console.log('Connection to database disconnected');
	});

	db.on('error', (error) => {
		console.log('Error occured while connecting to database:', JSON.stringify(error));
	});

	callback(db);

};
