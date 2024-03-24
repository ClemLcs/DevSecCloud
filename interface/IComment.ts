import {WithId} from "mongodb";

export interface IComment extends WithId<Document>{
    name: string
    email: string
    movie_id: string
    text: string
    date: Date
}