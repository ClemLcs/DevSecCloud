import type {NextApiRequest, NextApiResponse} from 'next'
import {MoviesDao} from "../../database/queries/Movies";
import {ValidationError} from "joi";
import {HttpError} from "../../exception/HttpError";


/**
 * /api/movies:
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const moviesDao = new MoviesDao();

    try{
        switch (req.method) {
            case 'GET':
                res.status(200).send(await moviesDao.getMoviesLimit10());
                break;
            default:
                res.status(405).send("Méthode non autorisée");
                break;
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