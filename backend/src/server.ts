import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/practice');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo open');
})


var routes = require('./routes/UserRoutes');

app.use('/', routes);


app.listen(4000, () => console.log(`Express server running on port 4000`));