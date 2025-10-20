const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({

    nombreEvento : {type:String, required: true},
    

}, {timestamps: true});