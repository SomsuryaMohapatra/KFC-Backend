const express=require('express');
const connectToMongoDB=require('./db');
const cors=require('cors');

//calling mongodb atlas connection method
connectToMongoDB();

const app=express();
const port=5000;

app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With,Content-Type,Accept"
//     );
//     next();
// })

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use(express.json());
app.use('/api',require('./routes/CreateUser'));

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})