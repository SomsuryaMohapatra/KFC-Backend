const express=require('express');
const connectToMongoDB=require('./db');

//calling mongodb atlas connection method
connectToMongoDB();

const app=express();
const port=5000;

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use(express.json());
app.use('/api',require('./routes/CreateUser'));

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})