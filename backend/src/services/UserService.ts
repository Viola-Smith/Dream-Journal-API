
import UserRepo from '../database/repositories/UserRepo'

export default class UserService{

    public static async login(username:String, password:String){
        try{
            let user = await UserRepo.findUserByUsername(username)
            if(user==null) return {"user":user, "message":"User not found"};
            else 
                if(user.get('password') != password) return {"user":user, "message":"Password incorrect"};
                else return {"user":user, "message":"ok"};
        }catch(e){
            console.log(e)
        }
    }

}