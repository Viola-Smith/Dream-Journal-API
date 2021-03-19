import express from 'express';


const router = express.Router();

import DreamService from '../services/DreamService'




router.route('/').get(async (req, res)=>{
	let title = req.query.title
	let type = req.query.type
	let dateFrom = req.query.date1
	let dateTo = req.query.date2
	let page = req.query.page
	let pageSize = req.query.size
	res.json( await DreamService.search(title, type, dateFrom,dateTo, page, pageSize))
  }
);


module.exports = router;