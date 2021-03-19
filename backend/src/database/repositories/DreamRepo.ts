
import { response } from 'express';
import DreamService from '../../services/DreamService';
import Dream, { DreamType } from '../models/dream';
//import Promise from 'promise'

export default class DreamRepo {


    public static async findLastId(){
        return await Dream.find({},  async (err, dreams)=>{
            if(err) console.log(err)
        }).sort({"id":-1}).limit(1)
    }

    public static async createDream(dreamInfo){
        var obj = {id:0, title: dreamInfo.title, description: dreamInfo.description, date: dreamInfo.date, type: dreamInfo.type}
        obj.type = DreamService.getDreamTypeName(obj.type)

        let lastId=1
        let lastEl = await DreamRepo.findLastId()
        if(lastEl.length>0) lastId = lastEl[0].get('id')+1
        obj.id= lastId
        let newDream = new Dream(obj);

        return await Dream.collection.insertOne(newDream)
    }

    public static async getAllDreams(){
        return await Dream.find().exec()
    }

    public static async getDream(id){
        return await Dream.findOne({"id":id}).exec()
    }

    public static async updateDream(id: number, newDream){
        return await Dream.findOneAndUpdate({"id":id}, newDream, { new: true }).exec()
    }

    public static async deleteDream(id:number){
        return await Dream.findOneAndDelete({"id":id})
    }

    public static transforDateRange(dateFrom, dateTo){
        if(dateFrom=="" || dateFrom==undefined) {
            if(dateTo=="" || dateTo==undefined) return { $exists: true }
            else return {"$lt": new Date(dateTo)}
        }else {
            if(dateTo=="" || dateTo==undefined) return { "$gte": new Date(dateFrom) }
            else return { "$gte": new Date(dateFrom), "$lt": new Date(dateTo) }
        }
    }

    public static async searchDreams(title, type, dateFrom,dateTo, page){
        if(title=="" || title==undefined) title= { $exists: true }
        if(type=="" || type==undefined) type= { $exists: true }

        let dateComparison:any = this.transforDateRange(dateFrom, dateTo)
        if(page == undefined || page=="" || isNaN(Number(page))) page=1
        
        return await Dream.collection.aggregate([
            { "$addFields": {
              "date2": {
                "$dateFromString": {
                  "dateString": "$date"
                }
              }
            }},
            { "$match": { $and: [
                { "date2": dateComparison },
                {"title": title},
                {"type": type}
            ] }}   
         
          ]).toArray()

    }

}