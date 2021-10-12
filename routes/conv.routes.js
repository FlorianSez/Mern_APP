const router = require('express').Router();
const ConvModel = require('../models/ConvModel')

// NOUVELLE CONVERSATION
router.post('/', async (req, res) => {
    const newConversation = new ConvModel({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET CONV OF USER
// $in RÉCUPÈRE TOUTES LES CONVERSATION OU IL Y'A LE MEMBERS USERID
router.get('/:userId', async (req, res) => {
    try {
        const conversation = await ConvModel.find(
            {
                members: { $in: req.params.userId }
            }
        )
            res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;