const app = require('express')()

const router = require('express').Router(); 
// Pour supprimer ou modifier des utilisateurs
const userController = require('../controllers/user.controller')
// Pour ajouter des utilisateurs
const authControler = require('../controllers/auth.controller.js');

const uploadController = require('../controllers/upload.controller.js')

const multer = require('multer')
const upload = multer()


// PARTIE AUTH
// Partie ajout d'utilisateur
router.post('/register', authControler.signUp)
// Partie pour se logger
router.post('/login', authControler.signIn)
// Pour se déconnecter
router.get('/logout', authControler.logout)

// PARTIE CONTROLE DES DONNÉES USERS
//parcourir la base de donnée
router.get('/', userController.getAllUsers)
router.get('/waiting', userController.getUsersNotAccept)
// Retourne les information d'un user
router.get('/:id', userController.userInfo)
// Update le nom ou prenom ou photo
router.put('/:id', userController.updateUser)
// Supprime un user
router.delete('/:id', userController.deleteUser)
// Ajoute une conversation en favoris 
router.patch('/favoris/:id', userController.favoris)
// Enlève un user de favoris 
router.patch('/unfavoris/:id', userController.unfavoris)

// PARTIE UPLOADS PHOTO PROFILS
router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router;