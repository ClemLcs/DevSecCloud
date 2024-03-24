import Joi from "joi";

export const commentValidation = Joi.object({
    name: Joi.string().required().min(1).messages({
        "string.base": "Le  nom n'est pas valide",
        "sting.min": "Votre nom est trop court",
    }),
    email: Joi.string().email().messages({
        "string.email": "Veuillez renseignez un email valide",
    }),
    movie_id: Joi.string().required().messages({
        "string.base": "L'identifiant du film n'est pas valide",
    }),
    text: Joi.string().min(1).required().messages({
        "string.base": "Votre commentaire n'est pas valide",
        "string.empty": "Vous n'avez pas de commentaire saisie",
        "string.min": " Votre commentaire est trop court",
    }),
    date: Joi.date().min(Date.now()).required().messages({
        "string.base": "La date n'est pas valide"
    }),
})

export const updateCommentValidation = Joi.object({
    _id: Joi.string().required().messages({
        "string.base": "L'identifiant du commentaire n'est pas valide",
    }),
    name: Joi.string().required().min(1).messages({
        "string.base": "Le  nom n'est pas valide",
        "sting.min": "Votre nom est trop court",
    }),
    email: Joi.string().email().messages({
        "string.email": "Veuillez renseignez un email valide",
    }),
    movie_id: Joi.string().required().messages({
        "string.base": "L'identifiant du film n'est pas valide",
    }),
    text: Joi.string().min(1).required().messages({
        "string.base": "Votre commentaire n'est pas valide",
        "string.empty": "Vous n'avez pas de commentaire saisie",
        "string.min": " Votre commentaire est trop court",
    }),
    date: Joi.date().min(Date.now()).required().messages({
        "string.base": "La date n'est pas valide"
    }),
})