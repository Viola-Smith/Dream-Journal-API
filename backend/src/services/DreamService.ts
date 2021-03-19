
import moment from 'moment';
import Helper from '../helpers/Helper';
import { DreamType, IDream } from '../database/models/dream';
import DreamRepo from '../database/repositories/DreamRepo'
import DreamTypeService from './DreamTypeService';

export default class DreamService{

    public static async createDream(dreamInfo){
        if(!moment(dreamInfo.date, "YYYY-MM-DD", true).isValid() ) return {"error message": "The date is not in the right format"}
        if(!DreamTypeService.isValidType(dreamInfo.type)) return {"error message": "The dream type is not valid"}
        try{
            dreamInfo.type = DreamTypeService.getDreamTypeName(dreamInfo.type)
            let res = await DreamRepo.createDream(dreamInfo)
            return res.ops[0]
        }catch(err){
            console.log(err)
            return null
        }
    }

    public static async getAllDreams(){
        try{
            return await DreamRepo.getAllDreams()
        }catch(err){
            console.log(err)
            return null
        }
    }

    public static async findDream(id:number){
        if(isNaN(id)) return {"error message": "id is not a number"}
        try{
            return await DreamRepo.getDream(id)
        }catch(err){
            console.log(err)
            return null
        }
    }

    public static async updateDream(id:number, newDream){
        if(isNaN(id)) return {"error message": "id is not a number"}
        newDream.type = DreamTypeService.getDreamTypeName(newDream.type)
        try{
            return await DreamRepo.updateDream(id, newDream)
        }catch(err){
            console.log(err)
            return null
        }
    }


    public static async deleteDream(id:number){
        if(isNaN(id)) return {"error message": "id is not a number"}
        try{
            return await DreamRepo.deleteDream(id)
        }catch(err){
            console.log(err)
            return null
        }
    }


    public static async search(title, type, dateFrom, dateTo, page, pageSize){
        type = DreamTypeService.getDreamTypeName(type)
        try{
            let arr =  await DreamRepo.searchDreams(title, type, dateFrom, dateTo)
            let page_number = Number(page)
            let page_size = Number(pageSize)

            if(isNaN(page_number)  ||  isNaN(page_size) ) return arr
            return Helper.paginate(arr,page_number,page_size)
        }catch(err){
            console.log(err)
            return null;
        }
        
    }

}