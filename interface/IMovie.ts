import {Double, WithId} from "mongodb";

interface IAwards {
    wins: number,
    nominations: number,
    text: string,
}

interface Iimdb {
    rating: Double,
    votes: number,
    id: number,
}

interface Iviewer {
    rating: Double,
    numReviews: number
    meter: number
}

interface Icritic {
    rating: Double,
    numReviews: number
    meter: number
}

interface Itomatoes {
    viewer: Iviewer,
    fresh: number
    critic: Icritic,
    rotten: number
    lastUpdated: Date,
}

export interface IMovie extends WithId<Document>{
    plot: string,
    genres: Array<String>,
    runtime: string,
    cast: Array<String>,
    poster: string,
    title: string,
    fullplot: string,
    languages: Array<String>,
    released: Date,
    directors: Array<String>,
    rated: string,
    awards: IAwards,
    lastupdated: Date,
    year: number,
    imdb: Iimdb,
    countries: Array<String>,
    type: string,
    tomatoes: Itomatoes,
    num_mflix_comments: number
}