import type {NextApiRequest, NextApiResponse} from 'next'
import {CommentsDAO} from "../../../../database/queries/Comments";
import {ValidationError} from "joi";
import {HttpError} from "../../../../exception/HttpError";

/**
 * /api/movie/[idMovie]/comments:
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const commentsDao = new CommentsDAO()

    try{
        switch (req.method) {
            case 'GET':
                const idMovie: string = req.query.idMovie as string
                const comments = await commentsDao.getAllCommentsByMovieId(idMovie);

                if(comments){
                    res.status(200).send(comments);
                    break;
                }
                break;
            default:
                res.status(405).send("Method not allowed");
        }
    }catch(e){
        if(e instanceof ValidationError){
            console.log(e);
            res.status(400).send(e);
            return;
        }if(e instanceof  HttpError){
            console.log(e);
            res.status(e.statusCode).send(e.getErrorMessage());
            return;
        }else{
            console.log(e);
            res.status(500).send(e);
        }
    }
}