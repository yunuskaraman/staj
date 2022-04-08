const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {hash, compare} = require('bcrypt');

let returnResponse = (res,status,error,data) => {

    res.json({status,error,data})
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const sqlcumlesi ='mongodb+srv://yunuskaraman:GwCPQjSO7E11AAe1@cluster0.lhtg4.mongodb.net/rotaplan?retryWrites=true&w=majority';
exports.module = mongoose.connect(sqlcumlesi,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("mangoodb Connected")
}).catch((err) => console.log(err));



const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');



app.use('/user',userRouter);
app.use('/user',loginRouter);


app.listen(8000, () =>{
    console.log('Listenning port on 8000...');
});
