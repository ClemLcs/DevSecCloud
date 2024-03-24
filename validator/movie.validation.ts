import Joi from "joi";

export const movieValidation = Joi.object({
    plot: Joi.string().required(),
    genres: Joi.array().required(),
    runtime: Joi.string().required(),
    poster: Joi.string().required(),
    title: Joi.string().required(),
    lastupdated: Joi.date().min(Date.now()).required().messages({
        "string.base": "La date n'est pas valide"
    })
})

export const updateMovieValidation = Joi.object({
    _id: Joi.string().required(),
    plot: Joi.string().required(),
    genres: Joi.array().required(),
    runtime: Joi.string().required(),
    poster: Joi.string().required(),
    title: Joi.string().required(),
    lastupdated: Joi.date().min(Date.now()).required().messages({
        "string.base": "La date n'est pas valide"
    }),
    num_mflix_comments: Joi.number().required()
})