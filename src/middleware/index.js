import { Router } from 'express';
import { toRes } from '../lib/util';
import { verify as jwtVerify } from 'jsonwebtoken';

export default ({ config, db }) => {
	let routes = Router();

	// Authentication Middleware
	routes.use((req, res, next) => {
		// allow to enter public routes without auth
		let allowed = false;
		config.public_routes.forEach(route => {
			if (req.url.indexOf(route) > -1) allowed = true;
		});
		if (allowed) return next();
		
		// check for auth
		let token = req.headers.authorization;
		if (!token) return toRes(res, 401)({ message: 'Unauthorised access!' });

		token = token.split('.')

		if (token.length != 3) toRes(res, 401)({ message: 'Invalid Authorization token format!' });

		jwtVerify(token.join('.'), config.jwt_secret, (err, decoded) => {
			if (err) toRes(res, 401)({ message: 'Invalid Authorization token!' });
			req.user = decoded;
			next();
		});

	});

	return routes;
}
