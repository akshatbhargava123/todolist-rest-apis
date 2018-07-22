import ListModel from '../../models/lists';
import { toRes, mongooseErrorHandler } from './../../lib/util';

export default ({ req, res, config, db }) => ({

	create() {
		ListModel(db).create({
			userId: req.user._id,
			...req.body
		}, (err, result) => {
			if (err) return toRes(res, 500)(mongooseErrorHandler(err));
			toRes(res)(null, { savedList: result });
		});
	},

	fetchAll() {
		ListModel(db).find({ userId: req.user._id }, (err, result) => {
			if (err) return toRes(res, 500)(mongooseErrorHandler(err));
			toRes(res)(null, { lists: result });
		});
	},

	updateList() {
		ListModel(db).findByIdAndUpdate(req.params.id, {
			$set: req.body
		}, (err, result) => {
			if (err) return toRes(res, 500)(mongooseErrorHandler(err));
			toRes(res)(null, { listUpdated: true });
		});
	},

	deleteList() {
		ListModel(db).find({ _id: req.params.id }, (err, result) => {
			if (err) return toRes(res, 404)(mongooseErrorHandler(err));
			if (result[0].userId != req.user._id) {
				return toRes(res, 401)({ message: 'You cannot manipulate other\'s list' });
			}

			result[0].remove((err) => {
				if (err) return toRes(res, 404)(mongooseErrorHandler(err));
				toRes(res)(null, { message: "List successfully deleted!" });
			});
		});
	}

});
