require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()


const posts = [
    {
        name : "Mzomba",
        post : "My name is Mzomba"
    }, 
    {
        name : "Dube",
        post : "My surname is Dube"
    }
]
app.use(express.json())
app.get('/post', authenticationToken, (req, res) =>{

    res.json(posts.filter(post => post.name === req.user.name))
})
app.post('/login', (req, res) =>{
    //Authenticate

    const username = req.body.username
    const user = {name : username}

    const accessKey = jwt.sign(user, process.env.ACCESS_TOKEN_SECRIT)
    res.json({accessKey: accessKey})
})

function authenticationToken(req, res, next){
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1]

if(token == null) return res.sendStatus(401)
jwt.verify(token, process.env.ACCESS_TOKEN_SECRIT, (err, user) =>{
    if(err) return res.sendStatus(403)
    req.user = user
next()
})
}
app.listen(3000)