const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route')
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://HarshalJamdar:810Umakant@cluster0.wz2ii.mongodb.net/WysaSleepingApp",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb is Connected"))
.catch(err=>console.log(err))

app.use('/',routes)

app.listen( process.env.PORT || 3000, function(){
    console.log("Express is connected at" +" "+(process.env.PORT || 3000))
})