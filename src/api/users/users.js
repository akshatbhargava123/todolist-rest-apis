import UserModel from '../../models/users';
import { hashSync, compareSync } from 'bcryptjs';
import { sign as jwtSign } from 'jsonwebtoken';
import { toRes, mongooseErrorHandler } from './../../lib/util';

export default ({ req, res, config, db }) => ({

	login() {
		if (!req.body.email) return toRes(res, 500)({ message: 'Email field is required!' });
		if (!req.body.password) return toRes(res, 500)({ message: 'Password field is required!' });
		UserModel(db).findOne({
			email: req.body.email
		}, (err, user) => {
			if (err) return toRes(res, 500)(mongooseErrorHandler(err));
			if (!user) return toRes(res, 404)({ message: 'No User Found!' });
			const passwordIsValid = compareSync(req.body.password, user.password);
			if (!passwordIsValid) return toRes(res, 401)({ message: 'Invalid credentials!' });
			const token = jwtSign({
				_id: user._id,
				name: user.name,
				email: user.email
			}, config.jwt_secret, { expiresIn: 86400 });
			toRes(res)(null, { token });
		});
	},

	register() {
		const hashedPassword = hashSync(req.body.password, 8);
		UserModel(db).create({
			email: req.body.email,
			password: hashedPassword,
			name: req.body.name
		}, (err, result) => {
			if (err) return toRes(res, 500)(mongooseErrorHandler(err));

			let newUser = result.toJSON();
			delete newUser.password;
			const token = jwtSign(newUser, config.jwt_secret, {
				expiresIn: "30d"
			});
			toRes(res)(err, { token });
		});
	}

});
