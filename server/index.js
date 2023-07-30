import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import SequelizeStore from 'connect-session-sequelize';
import userRoute from './src/routes/userRoute.js';
import produkRoute from './src/routes/produkRoute.js';
import authRoute from './src/routes/authRoute.js';
import database from './src/config/database.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db : database
})

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    store : store,
    cookie : {
        secure : 'auto'
    }
}))

app.use(cors({credentials : true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', userRoute);
app.use('/', produkRoute);
app.use('/', authRoute);

// store.sync()

app.listen(PORT, () => {
    console.log(`Server telah berjalan di port ${PORT}`);
})