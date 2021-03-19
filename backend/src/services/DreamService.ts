
import moment from 'moment';
import Helper from '../helpers/Helper';
import { DreamType, IDream } from '../database/models/dream';
import DreamRepo from '../database/repositories/DreamRepo'
import DreamTypeService from './DreamTypeService';

const pino = require('pino');

const logger = pino({
    level:  'debug' 
});


export default class DreamService{

    public static async createDream(dreamInfo){
        if(!moment(dreamInfo.date, "YYYY-MM-DD", true).isValid() ) {
            logger.error(new Error("Create query failed"), "The date is not in right format")
            return {"error message": "The date is not in the right format"}
        }
            
        if(!DreamTypeService.isValidType(dreamInfo.type)) {
            logger.error(new Error("Create query failed"), "The dream type is not valid")
            return {"error message": "The dream type is not valid"}
        } 
        
        try{
            dreamInfo.type = DreamTypeService.getDreamTypeName(dreamInfo.type)
            let res = await DreamRepo.createDream(dreamInfo)
            logger.info('Created a dream with id '+res.ops[0].id)
            return res.ops[0]
        }catch(err){
            logger.error(new Error("Create query failed"), err)
            return {"error message": err}
        }
    }

    public static async getAllDreams(){
        try{
            let dreams =  await DreamRepo.getAllDreams()
            logger.info('Got all dreams')
            return dreams
        }catch(err){
            logger.error(new Error("Get all dreams failed"), err)
            return {"error message": err}
        }
    }

    public static async findDream(id:number){
        if(isNaN(id)) {
            logger.error(new Error("Get a dream failed"), "Id was not a number")
            return {"error message": "Id was not a number"}
        }
        try{
            let dream =  await DreamRepo.getDream(id)
            logger.info('Got a dream with id '+id)
            return dream
        }catch(err){
            logger.error(new Error("Get a dream failed with id "+id), err)
            return {"error message": err}
        }
    }

    public static async updateDream(id:number, newDream){
        if(isNaN(id)){
            logger.error(new Error("Update a dream failed"), "Id was not a number")
            return {"error message": "Id was not a number"}
        }  
        newDream.type = DreamTypeService.getDreamTypeName(newDream.type)
        try{
            let updatedDream =  await DreamRepo.updateDream(id, newDream)
            logger.info('Updated a dream with id '+id)
            return updatedDream
        }catch(err){
            logger.error(new Error("Update a dream failed with id "+id), err)
            return {"error message": err}
        }
    }


    public static async deleteDream(id:number){
        if(isNaN(id)){
            logger.error(new Error("Delete a dream failed"), "Id was not a number")
            return {"error message": "Id was not a number"}
        } 
        try{
            let deletedDream =  await DreamRepo.deleteDream(id)
            logger.info('Deleted a dream with id '+id)
            return deletedDream
        }catch(err){
            logger.error(new Error("Delete a dream failed with id "+id), err)
            return {"error message": err}
        }
    }


    public static async search(title, type, dateFrom, dateTo, page, pageSize){
        type = DreamTypeService.getDreamTypeName(type)
        try{
            let arr =  await DreamRepo.searchDreams(title, type, dateFrom, dateTo)
            let page_number = Number(page)
            let page_size = Number(pageSize)

            logger.info('Searched for dreams')
            logger.debug('Searched with parameters: title = '+title+', type= '+type+', date1= '+dateFrom+', date2='+ dateTo
                +' , page number = '+page_number+', page size = '+page_size)
            if(isNaN(page_number)  ||  isNaN(page_size) ) return arr
            return Helper.paginate(arr,page_number,page_size)
        }catch(err){
            logger.error(new Error("Search dreams failed"), err)
            return {"error message": err}
        }
        
    }

}