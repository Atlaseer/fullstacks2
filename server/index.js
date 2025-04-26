const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//app.use(express.static(path.join(__dirname, '../client/dist')))


//Middleware

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Server is running...')
})

app.get('/api/message', (res, req)=>{
    //console.log('Message is retrieved from backend')
    res.json({message:'Message from backend'})
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '..client/dist/index.html'))
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
});
