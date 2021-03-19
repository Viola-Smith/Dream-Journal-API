
import { DreamType } from '../database/models/dream';
import DreamRepo from '../database/repositories/DreamRepo'

export default class UserService{

    

    public static getAllDreamTypes(){
        var values = Object.keys(DreamType).filter(d=>isNaN(Number(d)))
        //console.log(values)
        return values
    }

}