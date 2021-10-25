const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

// Le temps que le token va durer (durée de vie de la connexion)
const maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}


// Pour ajouter un utilisateur avec formulaire
module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const { nom, prenom, poste, email, password } = req.body
    try {
        const user = await UserModel.create({ nom, prenom, poste, email, password });
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = signUpErrors(err)
        res.status(200).send({ errors })
    }
}

// Faire attention à ne pas avoir 2 adresses mail pareil sinon le mot de passe ne passera pas.
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)
        if (user.accept == false){
            return res.status(200).json({message: 'L\'admin ne vous à pas accepté'})
        }
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = signInErrors(err)
        res.status(200).json({ errors })
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/')
}