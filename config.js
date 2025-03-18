const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config()




const url=process.env.MONGODB_URL


const mongoDbConnect=mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})

module.exports= {mongoDbConnect};