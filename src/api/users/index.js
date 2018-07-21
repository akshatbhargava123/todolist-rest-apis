import { Router } from 'express';
import { hashSync } from 'bcryptjs';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';
import { toRes } from './../../lib/util';
import users from './users';

export default ({ config, db }) => {
  let api = Router();

  // perhaps expose some API metadata at the root
  api.post('/login', (req, res) => {
    const token = req.headers.authorization;
    if (!token) toRes(res, 401)({ message: 'No token found!' }, null);
    jwtVerify(token, config.jwt_secret, (err, decoded) => {
      if (err) return toRes(res, 500)({ message: 'Invalid token' }, null);
      toRes(res)(null, { decoded });
    });
  });

  api.post('/register', (req, res) => {
    const hashedPassword = hashSync(req.body.password, 8);
    const user = {
      name: 'akshat',
      email: 'a@b.com',
      password: '123456'
    };
    console.log(config.jwt_secret)
    const token = jwtSign(user, config.jwt_secret, {
      expiresIn: "30d"
    });
    toRes(res)(null, { token });
  });

  return api;
}
