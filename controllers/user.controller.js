// Pour supprimer ou modifier des utilisateurs
// Appel de la bdd
const UserModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    // Select appel toute la bdd, si on veut pas faire transiter le password --> select(-password)
    const users = await UserModel.find().select();
    res.status(200).json(users)
}

/* --------------------------------------------------------- */

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown ' + req.params.id)
    }).select('-Password');
}

/* --------------------------------------------------------- */

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {

        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    prenom: req.body.prenom,
                    nom: req.body.nom,
                    photo: req.body.photo
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    res.send(docs)
                    return;
                };
                if (err) {
                    res.status(500).send({ message: err })
                    return;
                };
            },
        );

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

/* --------------------------------------------------------- */

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send('ID unknown ' + req.params.id)

    try {
        await UserModel.findOneAndRemove({ _id: req.params.id }).exec()
        res.status(200).json({ message: 'success to delete' })
    } catch (err) {
        return res.status(500).json({ message: 'Error to delete : ' + err })
    }
}

/* --------------------------------------------------------- */

module.exports.favoris = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idFav))
        return res.status(400).send("ID unknown : " + req.params.id)

    try {
        // On ajoute l'ID de la personne dans la liste de la personne
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { favoris: req.body.idFav } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) return res.status(201).json(docs)
                else return res.status(401).json(err)
            }
        )
    } catch (err) {
        return res.status(500).json({ message: 'Error to delete : ' + err })
    }
}

/* --------------------------------------------------------- */

module.exports.unfavoris = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idUnFav))
        return res.status(400).send("ID unknown : " + req.params.id)

    try {
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { favoris: req.body.idUnFav } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) return res.status(201).json(docs)
                else return res.status(401).json(err)
            }
        )
    } catch (err) {
        return res.status(500).json({ message: 'Error to delete : ' + err })
    }
}
