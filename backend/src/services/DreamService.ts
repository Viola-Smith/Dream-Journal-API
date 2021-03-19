
import { DreamType } from '../database/models/dream';
import DreamRepo from '../database/repositories/DreamRepo'

export default class DreamService{

    public static getAllDreamTypes(){
        var values = Object.keys(DreamType).filter(d=>isNaN(Number(d)))
        //console.log(values)
        return values
    }

    public static getDreamTypeName(index:number){
        return DreamService.getAllDreamTypes()[index]
    }

    public static async createDream(dreamInfo){
        let res = await DreamRepo.createDream(dreamInfo)
        return res.ops[0]    
    }

    public static async getAllDreams(){
        return await DreamRepo.getAllDreams()
    }

    public static async updateDream(id:number, newDream){
        return await DreamRepo.updateDream(id, newDream)
    }

}