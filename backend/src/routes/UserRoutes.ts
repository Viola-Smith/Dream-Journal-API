import express from 'express';
const fs = require('fs')


const router = express.Router();

import UserService from '../services/UserService'


router.route('/login').post(async(req, res)=>{
		let username = req.body.username
		let password = req.body.password
		let result = await UserService.login(username, password)
		res.json(result)
    }
);


module.exports = router;