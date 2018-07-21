import { Schema, SchemaTypes } from 'mongoose';

const List = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  items: [{
    text: { type: String, required: true },
    isCompleted: { type: Boolean, default: false }
  }]
});

const ListModel = (db) => db.model('list', List);

export default ListModel;