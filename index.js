import express from 'express';
import 'dotenv/config';
import monggose from 'mongoose';
//Import Routes
import authRouter from './route/auth.js';
import agencyRouter from './route/agencyRouter.js';

const app = express();

//Connect to Database
monggose.connect("" + process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
}
);

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api', authRouter);
app.use('/api', agencyRouter)



app.listen(3000, () =>
    console.log('Server is running')
);