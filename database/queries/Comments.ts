import {HttpError} from "../../exception/HttpError";
import {IComment} from "../../interface/IComment";

import {ObjectId} from "mongodb";
import {MongoClientConnector} from "../../lib/mongodb";
import {MoviesDao} from "./Movies";

export class CommentsDAO {

    private movieDao: MoviesDao

    constructor() {
        this.movieDao = new MoviesDao()
    }

    async getAllCommentsByMovieId(idMovie: string): Promise<IComment> {
        const client = await MongoClientConnector.Instance.clientPromise
        const db = client.db("sample_mflix").collection("comments");

        const result = (await db.find({movie_id: new ObjectId(idMovie)}).toArray()) as unknown as IComment;

        if (result) {
            return result
        }

        throw new HttpError(404, "Film non trouvé")
    }

    async getCommentByMovieId(idComment: string, idMovie: string): Promise<IComment> {
        const client = await MongoClientConnector.Instance.clientPromise
        const db = client.db("sample_mflix").collection("comments");

        const result = (await db.find({$and: [{_id: new ObjectId(idComment)}, {movie_id: new ObjectId(idMovie)}]}).toArray()) as unknown as IComment;

        if (result) {
            return result
        }

        throw new HttpError(404, "Commentaire non trouvé")
    }

    async newComment(req: IComment): Promise<IComment> {
        const client = await MongoClientConnector.Instance.clientPromise
        const db = client.db("sample_mflix").collection("comments");

        const movie = await this.movieDao.getMovieById(req.movie_id);
        const movieUpdate = await this.movieDao.updateMovieNbrComment(movie._id.toString());

        const newComment = (await db.insertOne({
            name: req.name,
            email: req.email,
            movie_id: movie._id,
            text: req.text,
            date: req.date
        })) as unknown as IComment

        if(newComment && movieUpdate){
            return newComment;
        }

        throw new  HttpError(500, "Une erreur est survenue lors de la création du commentaire")
    }

    async getCommentById(idComment: string): Promise<IComment> {
        const client = await MongoClientConnector.Instance.clientPromise
        const db = client.db("sample_mflix").collection("comments");

        const result = (await db.findOne({_id: new ObjectId(idComment)})) as unknown as IComment;

        if (result) {
            return result
        }

        throw new HttpError(404, "Commentaire non trouvé")
    }

    async updateComment(newComment: IComment): Promise<IComment> {
        const client = await MongoClientConnector.Instance.clientPromise
        const db = client.db("sample_mflix").collection("comments");
        const commentExist = await this.getCommentById(newComment._id.toString());


        const commentUpdate = (await db.findOneAndUpdate({_id: commentExist._id}, {
            $set: {
                name: newComment.name,
                email: newComment.email,
                movie_id: new ObjectId(newComment.movie_id),
                text: newComment.text,
                date: newComment.date
            }
        })) as unknown as IComment

        if(commentUpdate){
            return commentUpdate
        }

        throw new  HttpError(500, "Une erreur est survenue lors de la MAJ du commentaire")
    }

    async deleteComment(idComment: string, idMovie: string): Promise<IComment> {
        const client = await MongoClientConnector.Instance.clientPromise
        const db = client.db("sample_mflix").collection("comments");
        const commentExist = await this.getCommentById(idComment);

        const movieUnLink = await this.movieDao.unLinkMovie(idMovie);

        const commentUpdate = (await db.deleteOne({_id: new ObjectId(commentExist._id)})) as unknown  as IComment

        if(commentUpdate && movieUnLink){
            return commentUpdate
        }

        throw new HttpError(500, "Une erreur est survenue lors de la suppression du commentaire")
    }
}



