const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const imageRoute = require('./routes/image')
const userRegister = require('./routes/userRegister')
const app = express();
dotenv.config();
const cors = require('cors');
//const userOneModel = require('./model/UserOne');
const userOner = require('./routes/useroner')


app.use(cors());
app.use(express.json());
app.use('/api/v1/all',imageRoute);
app.use('/api/v1/user',userRegister);
app.use('/api/v1/test',userOner);



const port = process.env.PORT || 8082

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.post('/api/v1/userone',async(req,res)=>{
//     const data = req.body;
//     await userOneModel.create(data)
//     .then(result=>res.json(result))
//     .catch(err=>res.json(err))
// })

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected')
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected',()=>{
    console.log('disconnected');
})

app.listen(port, () => {
    connect()
    console.log(`Server is running on port ${port}`)
})
