import express from 'express';


const router = express.Router();

import DreamService from '../services/DreamService'



router.route('/types').get((req, res)=>{
	let result =  DreamService.getAllDreamTypes()
	res.json(result)
  }
);

module.exports = router;