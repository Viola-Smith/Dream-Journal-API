
import User, {UserDoc} from '../models/user';
//import Promise from 'promise'

export default class UserRepo {

    public static async findUserByUsername(username: String) {
        return await User.findOne({'username':username})
    }


}