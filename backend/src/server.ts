import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const pino = require('pino');

const logger = pino({
    level:  'info' 
});


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/dreams');

const connection = mongoose.connection;

connection.once('open', ()=>{
    logger.info('mongo open');
})


var routeType = require('./routes/DreamTypeRoutes');
var dreamRoutes = require('./routes/DreamRoutes');
var searchRoutes = require('./routes/DreamSearchRoutes');

app.use('/', routeType);
app.use('/dream', dreamRoutes);
app.use('/search', searchRoutes)

app.listen(4000, () => logger.info('Express server running on port 4000') );