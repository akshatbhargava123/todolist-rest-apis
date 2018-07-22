import { Router } from 'express';
import lists from './lists';

/**
 * @apiDefine AuthHeader
 * @apiHeader (Headers) {String} authorization Authorization token in format: 'Bearer {token}'
 */

export default ({ config, db }) => {
	let api = Router();

  /**
   * @api {get} /lists Fetch all lists
   * @apiGroup Lists
   * 
	 * @apiUse AuthHeader
	 * 
   * @apiSuccess {Boolean} error false
   * @apiSuccess {Array} lists Array of lists
   */

	api.get('/', (req, res) => lists({ req, res, config, db }).fetchAll());

  /**
   * @api {post} /lists Create a new list
   * @apiGroup Lists
   * 
	 * @apiUse AuthHeader
	 * 
	 * @apiParam {Object[]} items Array of item
	 * @apiParam {String} -.text Text of task
	 * @apiParam {Boolean} -.isCompleted Represents if task is completed (default: false)
	 *
   * @apiSuccess {Boolean} error false
   * @apiSuccess {Object} savedList Newly created list
   */

	api.post('/', (req, res) => lists({ req, res, config, db }).create());

  /**
   * @api {put} /lists/:id Update a list
   * @apiGroup Lists
   * 
	 * @apiUse AuthHeader
	 * 
	 * @apiParam {Object[]} items Array of item
	 * @apiParam {String} -.text Text of task
	 * @apiParam {Boolean} -.isCompleted Represents if task is completed
	 *
   * @apiSuccess {Boolean} error false
   */

	api.put('/:id', (req, res) => lists({ req, res, config, db }).updateList());

  /**
   * @api {delete} /lists/:id Delete a list
   * @apiGroup Lists
   * 
	 * @apiUse AuthHeader
	 *
   * @apiSuccess {Boolean} error false
   */

	api.delete('/:id', (req, res) => lists({ req, res, config, db }).deleteList());

	return api;
}
