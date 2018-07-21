import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

User.plugin(uniqueValidator, { message: 'Error, {PATH} {VALUE} already exists.' });

const UserModel = (db) => db.model('user', User);

export default UserModel;