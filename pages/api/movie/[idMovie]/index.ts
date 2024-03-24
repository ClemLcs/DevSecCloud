import type {NextApiRequest, NextApiResponse} from 'next'
import {MoviesDao} from "../../../../database/queries/Movies";
import {ValidationError} from "joi";
import {HttpError} from "../../../../exception/HttpError";
import {movieValidation, updateMovieValidation} from "../../../../validator/movie.validation";

/**
 * /api/movie/[idMovie]
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const moviesDao = new MoviesDao();

    try{
        switch (req.method) {
            case 'GET':
                const idMovie: string = req.query.idMovie as string
                const movie = await moviesDao.getMovieById(idMovie);

                if(movie){
                    res.status(200).send(movie);
                    break;
                }
                break;
            case 'POST':
                await movieValidation.validateAsync(req.body, { abortEarly: false });
                const element = await moviesDao.newMovie(req.body);
                if(element){
                    res.status(200).send(element)
                    break;
                }
                res.status(500).send("Erreur lors de l'enregistrement")
                break;
            case 'PUT':
                await updateMovieValidation.validateAsync(req.body, { abortEarly: false });
                const commentUpdate = await moviesDao.updateMovie(req.body);

                if(commentUpdate){
                    res.status(200).send(commentUpdate);
                    break;
                }
                res.status(404).send("Commentaire non trouvé");
                break;
            case 'DELETE':
                const idMovie2: string = req. query.idMovie as string

                const deleteComment = await moviesDao.deleteMovie(idMovie2);

                if(deleteComment){
                    res.status(200).send(deleteComment);
                    break;
                }
                res.status(404).send("Film introuvable")
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