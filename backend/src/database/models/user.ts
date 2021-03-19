import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
	lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    bought: {
		type: Array
	}
}, {collection:"Users"});

export interface UserDoc extends mongoose.Document {
    name: {
        type: String
    },
	lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    bought: {
		type: Array<Object>
	}
  }

export default mongoose.model('User', User);