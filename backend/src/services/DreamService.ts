
import moment from 'moment';
import { DreamType, IDream } from '../database/models/dream';
import DreamRepo from '../database/repositories/DreamRepo'

export default class DreamService{

    public static getAllDreamTypes(){
        var values = Object.keys(DreamType).filter(d=>isNaN(Number(d)))
        return values
    }

    public static getDreamTypeName(index:number){
        return DreamService.getAllDreamTypes()[index]
    }

    public static async createDream(dreamInfo){
        if( !moment(dreamInfo.date, "YYYY-MM-DD", true).isValid() ) return {"error message": "The date is not in the right format"}
        
        let arrDreamTypes = Array.from(Array(this.getAllDreamTypes().length).keys())
        if(!arrDreamTypes.includes(dreamInfo.type)) return {"error message": "The type is not valid"}
        
        let res = await DreamRepo.createDream(dreamInfo)
        return res.ops[0]    
    }

    public static async getAllDreams(){
        return await DreamRepo.getAllDreams()
    }

    public static async findDream(id:number){
        if(isNaN(id)) return {"error message": "id is not a number"}
        return await DreamRepo.getDream(id)
    }

    public static async updateDream(id:number, newDream){
        if(isNaN(id)) return {"error message": "id is not a number"}
        newDream.type = this.getDreamTypeName(newDream.type)
        return await DreamRepo.updateDream(id, newDream)
    }

    public static async deleteDream(id:number){
        if(isNaN(id)) return {"error message": "id is not a number"}
        return await DreamRepo.deleteDream(id)
    }


    public static async search(title, type, dateFrom, dateTo, page, pageSize){
        type = this.getDreamTypeName(type)
        let arr =  await DreamRepo.searchDreams(title, type, dateFrom, dateTo, page)
        console.log(arr)
        let page_number = Number(page)
        let page_size = Number(pageSize)
        return arr.slice((page_number - 1) * page_size, page_number * page_size)
    }

}