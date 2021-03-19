import express from 'express';
import DreamTypeService from '../services/DreamTypeService';
import Helper from '../helpers/Helper';


const router = express.Router();


router.route('/types').get((req, res)=>{
	let result =  DreamTypeService.getAllDreamTypes()
	res.json(result)
  }
);

module.exports = router;