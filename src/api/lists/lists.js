import ListModel from '../../models/lists';
import { toRes, mongooseErrorHandler } from './../../lib/util';

export default ({ req, res, config, db }) => ({

	create() {
		ListModel(db).create({
			userId: req.user.id,
			...req.body
		}, (err, result) => {
			if (err) return toRes(res, 500)(mongooseErrorHandler(err));
			toRes(res)(null, { savedList: result });
		})
	},

	fetchAll() {
		ListModel(db).find({ userId: req.user.id }, (err, result) => {
			if (err) return toRes(res, 500)(mongooseErrorHandler(err));
			toRes(res)(null, { lists: result });
		});
	}

});
