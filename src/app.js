import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(cookieParser())

app.use(express.json({
    limit: '16kb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(express.static('public'))

//routes
import foodsRoutes from './routes/foods.routes.js';
import healthEventsRoutes from './routes/healthEvents.routes.js';
import petsRoutes from './routes/pets.routes.js';
import remindersRoutes from './routes/reminder.routes.js';
import speciesRoutes from './routes/species.routes.js';
import symptomsRoutes from './routes/symptoms.routes.js';
import usersRoutes from './routes/users.routes.js';

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/foods', foodsRoutes);
app.use('/api/v1/health-events', healthEventsRoutes);
app.use('/api/v1/pets', petsRoutes);
app.use('/api/v1/reminders', remindersRoutes);
app.use('/api/v1/species', speciesRoutes);
app.use('/api/v1/symptoms', symptomsRoutes);

export {app};

