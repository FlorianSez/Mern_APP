const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config({path: './config/.env'});
const port = process.env.PORT || 5000; 
// IMPORT DES CHECK JWT
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
// APPEL DE LA BDD ET CONNEXION
require ('./models/mongo')
const cors = require('cors')

// POUR AUTORISER LES REQUETES DE REACT
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false
}

app.use(cors(corsOptions))

// FICHIERS DE ROUTES
const userRoutes = require('./routes/user.routes') 
const convRoutes = require('./routes/conv.routes')
const messageRoutes = require('./routes/message.routes')
const reuRoutes = require('./routes/reunion.routes')

// POUR UTILISER REQ.BODY ET REQ.COOKIES
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

// JWT CHECK 
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// ROUTES
app.use('/api/user', userRoutes);
app.use('/api/reunion', reuRoutes)
app.use('/api/conversation', convRoutes)
app.use('/api/message', messageRoutes)


 
// create a GET route
app.use('/app', (req, res) => { //Line 9
  res.send({ 
    express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'
  }); 
}); //Line 11

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6