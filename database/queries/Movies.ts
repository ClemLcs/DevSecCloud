import {IMovie} from "../../interface/IMovie";
import {MongoClientConnector} from "../../lib/mongodb";
import {ObjectId} from "mongodb";
import {HttpError} from "../../exception/HttpError";

export class MoviesDao {

    async getMoviesLimit10() : Promise<IMovie>{
        const client = await MongoClientConnector.Instance.clientPromise;
        const db = client.db("sample_mflix").collection("movies");
        const result = (db.find({}).limit(10).toArray()) as unknown as IMovie;

        if(result){
            return result;
        }

        throw new HttpError(500, "Une erreur est survenue lors de la récupération des films")
    }
    async getMovieById(idMovie: string): Promise<IMovie>{
        const client = await MongoClientConnector.Instance.clientPromise;
        const db = client.db("sample_mflix").collection("movies");
        const result = (await db.findOne({_id: new ObjectId(idMovie)})) as IMovie;

        if(result){
            return result;
        }

        throw new HttpError(404, "Film non trouvé")
    }

    async newMovie(req: IMovie): Promise<IMovie> {
        const client = await MongoClientConnector.Instance.clientPromise
        const db = client.db("sample_mflix").collection("movies");

        const newMovie = (await db.insertOne({
            plot: req.plot,
            genres: req.genres,
            runtime: req.runtime,
            poster: req.poster,
            title: req.title,
            lastupdated: Date.now(),
            num_mflix_comments: 0
        })) as unknown as IMovie

        if(newMovie){
            return newMovie;
        }

        throw new  HttpError(500, "Une erreur est survenue lors de la création du film")
    }

    async updateMovie(newMovie: IMovie): Promise<IMovie> {
        const client = await MongoClientConnector.Instance.clientPromise
        const db = client.db("sample_mflix").collection("movies");
        const movieExist = await this.getMovieById(newMovie._id.toString());


        const movieUpdate = (await db.findOneAndUpdate({_id: movieExist._id}, {
            $set: {
                plot: newMovie.plot,
                genres: newMovie.genres,
                runtime: newMovie.runtime,
                poster: newMovie.poster,
                title: newMovie.title,
                lastupdated: Date.now(),
                num_mflix_comments: newMovie.num_mflix_comments
            }
        })) as unknown as IMovie

        if(movieUpdate){
            return movieUpdate
        }

        throw new  HttpError(500, "Une erreur est survenue lors de la MAJ du film")
    }

    async updateMovieNbrComment(idMovie: string): Promise<IMovie>{
        try{
            const client = await MongoClientConnector.Instance.clientPromise;
            const db = client.db("sample_mflix").collection("movies");
            //Check If Movie Exist
            await this.getMovieById(idMovie);

            const result = (await db.findOneAndUpdate({_id: new ObjectId(idMovie)}, {
               $inc: {
                   num_mflix_comments: 1
               }
            }, {returnNewDocument:true})) as unknown as IMovie

            if(result){
                return result;
            }
        }catch (e: any) {
            console.log(e)
        }

        throw new HttpError(500, "Une erreur est survenue lors de la MAJ du nombre commentaire du film")
    }

    async unLinkMovie(idMovie: string): Promise<IMovie>{
        const client = await MongoClientConnector.Instance.clientPromise;
        const db = client.db("sample_mflix").collection("movies");
        //Check If Movie Exist
        await this.getMovieById(idMovie);

        const result = (await db.findOneAndUpdate({_id: new ObjectId(idMovie)}, {
            $inc: {
                num_mflix_comments: -1
            }
        }, {returnNewDocument:true})) as unknown as IMovie

        if(result){
            return result;
        }
    }

    async deleteMovie(idMovie: string): Promise<IMovie> {
        try{
            const client = await MongoClientConnector.Instance.clientPromise;
            const db = client.db("sample_mflix").collection("movies");
            //Check If Movie Exist
            await this.getMovieById(idMovie);

            const result = (await db.deleteOne({_id: new ObjectId(idMovie)})) as unknown as IMovie;

            if(result){
                return result;
            }
        }catch (e) {
            console.log(e)
        }

        throw new HttpError(500, "Une erreur est survenue lors de la suppression du film")
    }

}