const ReunionModel = require("../models/reuModel");
const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.listeReu = async (req, res) => {
  const reunions = await ReunionModel.find().select();
  res.status(200).json(reunions);
};

/* --------------------------------------------------------- */

module.exports.listeReuCree = async (req, res) => {
  try {
    const reunions = await ReunionModel.find({
      organisateurId: { $in: req.params.userId },
    });
    res.status(200).json(reunions);
  } catch (err) {}
};

/* --------------------------------------------------------- */

module.exports.listeReuAttente = async (req, res) => {
  try {
    const reunions = await ReunionModel.find({
      $and: [
        { participant: { $elemMatch: { membre: req.params.userId } } },
        { participant: { $elemMatch: { accept: false } } },
        { participant: { $elemMatch: { reject: false } } },
      ],
    });
    console.log(reunions);
    res.status(200).json(reunions);
  } catch (err) {
    console.log(err);
  }
};

/* --------------------------------------------------------- */

module.exports.listeReuAccept = async (req, res) => {
  try {
    const reunions = await ReunionModel.find({
      $and: [
        { participant: { $elemMatch: { membre: req.params.userId } } },
        { participant: { $elemMatch: { accept: true } } },
        { participant: { $elemMatch: { reject: false } } },
      ],
    });
    res.status(200).json(reunions);
  } catch (err) {
    console.log(err);
  }
};

/* --------------------------------------------------------- */

module.exports.listeReuReject = async (req, res) => {
  try {
    const reunions = await ReunionModel.find({
      $and: [
        { participant: { $elemMatch: { membre: req.params.userId } } },
        { participant: { $elemMatch: { accept: false } } },
        { participant: { $elemMatch: { reject: true } } },
      ],
    });
    res.status(200).json(reunions);
  } catch (err) {
    console.log(err);
  }
};

/* --------------------------------------------------------- */

module.exports.createReu = async (req, res) => {
  const newReu = new ReunionModel({
    organisateurId: req.body.organisateurId,
    participant: [],
    nom: req.body.nom,
    description: req.body.description,
    date: req.body.date,
  });
  try {
    const reunion = await newReu.save();
    res.status(201).json({ reunion: reunion });
  } catch (err) {
    res.status(400).send({ err });
  }
  // Voir pour ajouter directtement l'id de la personne connecté à la réunion
};

/* --------------------------------------------------------- */

module.exports.updateReu = async (req, res) => {
  if (!ObjectID.isValid(req.params.reuId))
    return res.status(400).json("ID unknown " + req.params.reuId);
  try {
    console.log("bonjour");
    console.log({ participant: { $elemMatch: { membre: req.body.membreId } } });
    ReunionModel.findOneAndUpdate(
      { _id: req.params.reuId, "participant.membre": req.body.membreId },
      {
        $set: {
          "participant.$.accept": req.body.accept,
          "participant.$.reject": req.body.reject,
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.send(docs);
          return;
        }
        if (err) {
          res.status(500).send({ message: { err } });
          return;
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ message: { err } });
  }
};

/* --------------------------------------------------------- */

module.exports.deleteReu = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown " + req.params.id);

  ReunionModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to delete: " + err);
  });
};

/* --------------------------------------------------------- */

module.exports.addParticipants = async (req, res) => {
  if (!ObjectID.isValid(req.params.reuId))
    return res.status(400).send("ID unknown " + req.params.reuId);
  try {
    ReunionModel.findByIdAndUpdate(
      // TROUVE AVEC L'ID DE LA RÉUNION DANS L'URL
      req.params.reuId,
      {
        $addToSet: {
          participant: {
            membre: req.body.id,
            accept: false,
            reject: false,
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else console.log(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

/* --------------------------------------------------------- */
// RETIRER UNE PERSONNE DE LA RÉUNIONS QUAND CELLE-CI REFUSE LA RÉUNION
module.exports.rmParticipants = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown " + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      // TROUVE LE USER AVEC L'ID DANS LE BODY
      req.body.id,
      // AJOUTE L'ID DE LA REUNION DANS L'URL
      {
        $pull: {
          reunion: {
            reunionId: req.params.id,
            accept: false,
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          res.send(docs);
          console.log("test");
        } else return res.status(400).send("Error to add reunion: " + err);
      }
    );

    ReunionModel.findByIdAndUpdate(
      // TROUVE AVEC L'ID DE LA RÉUNION DANS L'URL

      req.params.id,
      // ID DU PARTICIPANT DANS LE BODY
      {
        $pull: {
          participant: req.body.id,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) res.status(400).send("Error to add participants: " + err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
