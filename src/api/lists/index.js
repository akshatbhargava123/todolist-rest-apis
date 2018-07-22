import { Router } from 'express';
import lists from './lists';

export default ({ config, db }) => {
	let api = Router();

	// get all lists
	api.get('/', (req, res) => lists({ req, res, config, db }).fetchAll());

	api.post('/', (req, res) => lists({ req, res, config, db }).create());

	api.put('/:id', (req, res) => lists({ req, res, config, db }).updateList());

	api.delete('/:id', (req, res) => lists({ req, res, config, db }).deleteList());

	return api;
}
