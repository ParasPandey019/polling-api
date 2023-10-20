const express=require('express');
require('dotenv').config();
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
const db=require('./config/mongoose');

app.use('/',require('./routes/index'));

const Port=process.env.PORT;
   
app.listen(Port,function(err){
    if(err){
        console.log(err);
    }
    console.log("server is runing ...",Port);
})