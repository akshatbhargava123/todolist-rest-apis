import { Router } from 'express';
import users from './users';

export default ({ config, db }) => {
  let api = Router();

  /**
   * @api {post} /users/login Login
   * @apiGroup User
   * 
   * @apiParam {String} email User's email
   * @apiParam {String} password User's password
   * 
   * @apiSuccess {Boolean} error false
   * @apiSuccess {String} token Authorization Token
   */

  api.post('/login', (req, res) => users({req, res, config, db}).login());


  /**
   * @api {post} /users/register Register
   * @apiGroup User
   * 
   * @apiParam {String} name User's name
   * @apiParam {String} email Email to be registered
   * @apiParam {String} password Password of new account
   * 
   * @apiSuccess {Boolean} error false
   * @apiSuccess {String} token Authorization Token
   */

  api.post('/register', (req, res) => users({req, res, config, db}).register());

  return api;
}
