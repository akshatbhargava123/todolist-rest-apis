import { Router } from 'express';
import { toRes } from '../lib/util';
import { verify as jwtVerify } from 'jsonwebtoken';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here

	// Authentication Middleware
	routes.use((req, res, next) => {
		if (req.url.indexOf('login') > -1 || req.url.indexOf('register') > -1) return next();
		
		const token = req.headers.authorization.split('.');

		if (!token) toRes(res, 401)({ message: 'Unauthorised access!' });
		else if (token.length != 3) toRes(res, 401)({ message: 'Invalid Authorization token format!' });

		jwtVerify(token.join('.'), config.jwt_secret, (err, decoded) => {
			if (err) toRes(res, 401)({ message: 'Invalid Authorization token!' });
			req.user = decoded;
			next();
		});

	});

	return routes;
}
