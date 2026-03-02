const bcrypt = require('bcrypt')
const UserModel = require('../models/user');
const user = require('../models/user');

class UserController {

    constructor() {
        this.model = UserModel;
        this.register = this.register.bind(this);
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    async register(req, res) {
        try {
            const existingUser = await this.model.findOne(req.body.username)
            if(existingUser){
                return res.status(400).json({
                    message: 'Username already exists'
                })
            }

            if(req.body.password.length < 6){
                return res.status(400).json({
                    message: 'Password must be at least 6 characters long'
                })
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
            if (!req.body.password.match(passwordRegex)) {
                return res.status(400).json({
                    message: 'Password must be at least 6 characters and include uppercase, lowercase, number and special character'
                });
            }

            const cryptPassword = await bcrypt.hash(req.body.password, 10)
            const registeredUserId = await this.model.create({
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword
            })
            if(registeredUserId){
                const userData = await this.model.findById(registeredUserId)
                req.session.user = {
                    user_id: userData.id,
                    username: userData.username,
                    role: userData.role
                }
                res.status(201).json({ 
                    message: 'New user is registered',
                    session: req.session.user    
                });
            } else {
                res.status(404).json({ error: 'Session is not opened' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res){
        try {
            const user = await this.model.findOne(req.body.username)

            if(!user){
                return res.status(400).json({
                    message: 'Username not exists'
                })
            }

            const passwordCompare = await bcrypt.compare(req.body.password, user.password)
            if(!passwordCompare){
                return res.status(400).json({
                    message: 'Password is incorrect'
                })
            }

            req.session.user = {
                user_id: user.id,
                username: user.username,
                role: user.role
            }
            res.status(201).json({ 
                message: 'Login successful',
                session: req.session.user   
            });
        } catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async logout(req, res){
        req.session.destroy()
        res.status(201).json({ 
            message: 'Logout successful',   
        });
    }

}

module.exports = new UserController();