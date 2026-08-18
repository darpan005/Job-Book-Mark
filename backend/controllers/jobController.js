const Job = require("../models/job");


//Create job 
const createJob = async (req,res) =>{
    try{
        const {title,company,location,joburl,status} = req.body;

        const job = await Job.create({
            title,
            company,
            location,
            joburl,
            status
        });

        res.status(201).json(job);

    }catch(error){
        res.status(500).json({
            message : "Failed  to Create Job",
            error : error.message
        });
    }
};

module.exports = {createJob};