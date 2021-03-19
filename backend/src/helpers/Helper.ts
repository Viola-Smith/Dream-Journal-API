
export default class Helper{
    
    public static transforDateRange(dateFrom, dateTo){
        if(dateFrom=="" || dateFrom==undefined) {
            if(dateTo=="" || dateTo==undefined) return { $exists: true }
            else return {"$lt": new Date(dateTo)}
        }else {
            if(dateTo=="" || dateTo==undefined) return { "$gte": new Date(dateFrom) }
            else return { "$gte": new Date(dateFrom), "$lt": new Date(dateTo) }
        }
    }

    public static paginate(arr, page_number, page_size){
        return arr.slice((page_number - 1) * page_size, page_number * page_size)
    }

}
