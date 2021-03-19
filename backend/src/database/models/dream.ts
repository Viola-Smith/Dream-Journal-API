import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export enum DreamType{
    happy,
    sad,
    exciting,
    scary
}

let Dream = new Schema({
    id:{
        type:Number
    },
    title: {
        type: String
    },
	description: {
        type: String
    },
    date: {
        type: String
    },
    type: {
        type: DreamType,
    }
}, {collection:"Dream"});

export interface IDream extends Document {
    id:number,
    title:string,
    description: string,
    date: string,
    type:DreamType
}

export default mongoose.model<IDream>('Dream', Dream);