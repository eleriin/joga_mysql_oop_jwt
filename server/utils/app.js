const express = require('express')
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config()

const articleRoutes = require('../routes/article')
const authorRoutes = require('../routes/author')
const userRoutes = require('../routes/user') 

class App {
    constructor(port) {
        this.port = port
        this.app = express()
        this.initMiddleware()
        this.initRoutes()
        this.start()
        this.bindMethods()
    }

    bindMethods() {
        this.initMiddleware = this.initMiddleware.bind(this)
        this.initRoutes = this.initRoutes.bind(this)
        this.start = this.start.bind(this)
    }

    initMiddleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use(session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60
            }
        }))
    }

    initRoutes() {
        this.app.use('/', articleRoutes)
        this.app.use('/', authorRoutes)
        this.app.use('/', userRoutes) 
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }
}

module.exports = App