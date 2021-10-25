const UserModel = require("../models/userModel");

module.exports.signUpErrors = (err) => {
    let errors = { nom: "", prenom: "", poste: "", email: "", password: ""};

    if (err.message.includes("nom")) errors.nom = "Saisir un nom"

    if (err.message.includes("prenom")) errors.prenom = "Saisir un prenom"

    if (err.message.includes("poste")) errors.poste = "Saisir un poste"



    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré";

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email"))
        errors.email = "Email inconnu";

    if (err.message.includes('password'))
        errors.password = "Mot de passe incorrect"

    return errors;
}

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: "" };

    if (err.message.includes('invalid file'))
        errors.format = "Format incompatabile";

    if (err.message.includes('max size'))
        errors.maxSize = "Le fichier dépasse 500ko";

    return errors
}

module.exports.uploadErrors = (err) => {
    let error = { format: '', maxSize: '' }
    if (err.message.includes('Invalid File')) 
       error.format = "Format incompatabile"

       if (err.message.includes('Too much big file')) 
       error.format = "Le fichier dépasse la taille autorisé"

    return error
}