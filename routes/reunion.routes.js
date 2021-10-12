const router = require('express').Router()
const reuControler = require('../controllers/reunion.controller')

// AFFICHAGE DE TOUTES LES CONVERSATIONS
router.get('/', reuControler.listeReu)
// CRÉER RÉUNION
router.post('/', reuControler.createReu)
// UPDATE LA RÉUNION
router.put('/:id', reuControler.updateReu)
// SUPPRIMER LA RÉUNION
router.delete('/:id', reuControler.deleteReu)

// AJOUTER DES PARTICIPANTS
router.patch('/ajout-participants/:id', reuControler.addParticipants)
// SUPPRIMER DES PARTICIPANTS
router.patch('/rm-participants/:id', reuControler.rmParticipants)
module.exports = router