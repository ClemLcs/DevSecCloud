import type {NextApiRequest, NextApiResponse} from 'next'
import {commentValidation, updateCommentValidation} from "../../../../../validator/comment.validation";
import {CommentsDAO} from "../../../../../database/queries/Comments";
import {ValidationError} from "joi";
import {HttpError} from "../../../../../exception/HttpError";

/**
 * /api/movie/[idMovie]/comment/[idComment]
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const commentsDao = new CommentsDAO()

    try{
        switch (req.method) {
            case 'GET':
                const idMovie: string = req.query.idMovie as string
                const idComment: string = req.query.idComment as string

                const comment = await commentsDao.getCommentByMovieId(idComment, idMovie);

                if(comment){
                    res.status(200).send(comment);
                    break;
                }
                res.status(404).send("Commentaire ou film introuvable")
                break;
            case 'POST':
                await commentValidation.validateAsync(req.body, { abortEarly: false });
                const element = await commentsDao.newComment(req.body);
                if(element){
                    res.status(200).send(element)
                    break;
                }
                res.status(500).send("Erreur lors de l'enregistrement")
                break;
            case 'PUT':
                await updateCommentValidation.validateAsync(req.body, { abortEarly: false });
                const commentUpdate = await commentsDao.updateComment(req.body);

                if(commentUpdate){
                    res.status(200).send(commentUpdate);
                    break;
                }
                res.status(404).send("Commentaire non trouvé");
                break;
            case 'DELETE':
                const idMovie2: string = req. query.idMovie as string
                const idComment2: string = req.query.idComment as string

                const deleteComment = await commentsDao.deleteComment(idComment2, idMovie2);

                if(deleteComment){
                    res.status(200).send(deleteComment);
                    break;
                }
                res.status(404).send("Commentaire ou film introuvable")
                break;
            default:
                res.status(405).send("Méthode non autorisée");
                break;
        }
    }
    catch(e){
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