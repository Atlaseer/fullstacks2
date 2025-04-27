import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import projectAssignmentRoute from './routes/projectAssignments.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//app.use(express.static(path.join(__dirname, '../client/dist')));

//Middleware

app.use(cors());
app.use(express.json());

app.use('/api/project_assignments', projectAssignmentRoute)

app.get('/', (req, res) =>{
    res.send('Server is running...')
})

app.get('/api/message', (req, res)=>{
    //console.log('Message is retrieved from backend')
    res.json({message:'Message from backend'})
})

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB')
        app.listen(PORT, ()=>{
            console.log(`Server is running on port http://localhost:${PORT}`)
        });
    })
    .catch(err => {
        console.error('failed to connect to MongoDB', err)
    })

