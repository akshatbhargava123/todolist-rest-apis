import { version } from '../../package.json';
import { Router } from 'express';
import users from './users';
import lists from './lists';

export default ({ config, db }) => {
	let api = Router();

	api.use('/users', users({ config, db }));

	// mount the lists resource
	api.use('/lists', lists({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
