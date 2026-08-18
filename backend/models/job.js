const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    joburl : {
        type : String,
    },
    status : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        Default : Date.now
    },    
});

const Job = mongoose.model("Job",jobSchema);

module.exports = Job;