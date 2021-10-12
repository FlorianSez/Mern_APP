module.exports.signUpErrors = (err) => {
    let errors = { nom: "", prenom: "", poste: "", email: "", password: "" };

    if (err.message.includes("email")) errors.email = "Email incorrect";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit faire 8 caractères minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré";

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email"))
        errors.email = "Email inconnu";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"

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