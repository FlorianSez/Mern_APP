const router = require("express").Router();
const reuControler = require("../controllers/reunion.controller");
// AFFICHE TOUTES REUNIONS
router.get("/", reuControler.listeReu);
// AFFICHAGE DE TOUTES LES REUNIONS CRÉE PAR L'UTILISATEUR
router.get("/create/:userId", reuControler.listeReuCree);
// AFFICHAGE DE TOUTES LES REUNIONS EN ATTENTE PAR L'UTILISATEUR
router.get("/waiting/:userId", reuControler.listeReuAttente);
router.get("/accept/:userId", reuControler.listeReuAccept);
router.get("/reject/:userId", reuControler.listeReuReject);
// CRÉER RÉUNION
router.post("/", reuControler.createReu);
// UPDATE LA RÉUNION
router.put("/:reuId", reuControler.updateReu);
// SUPPRIMER LA RÉUNION
router.delete("/:reuId", reuControler.deleteReu);

// AJOUTER DES PARTICIPANTS
router.patch("/addParticipants/:reuId", reuControler.addParticipants);
// SUPPRIMER DES PARTICIPANTS
router.patch("/rmParticipants/:reuId", reuControler.rmParticipants);
module.exports = router;
