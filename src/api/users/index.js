import { Router } from 'express';
import users from './users';

export default ({ config, db }) => {
  let api = Router();

  // login endpoint
  api.post('/login', (req, res) => users({req, res, config, db}).login());

  // register a user endpoint
  api.post('/register', (req, res) => users({req, res, config, db}).register());

  return api;
}
