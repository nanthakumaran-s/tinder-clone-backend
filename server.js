import express from 'express'
import mongoose from 'mongoose'
import cards from './dbCards.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

// App Config
const app = express()
const port = process.env.PORT || 8001
const connection_url = '' //TODO: Enter your MongoDB Atlas URL


// Middlewares
app.use(express.json())
app.use(cors())


// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// API EndPoints
app.get('/', (req , res) => {
    res.status(200).send('Server for Tinder Clone by Nanthakumaran')
})

app.post('/tinder-clone/cards', (req, res)=> {
    const dbCard = req.body
    cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder-clone/cards', (req , res)=> {
    cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})


// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))