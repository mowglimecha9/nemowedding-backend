const express = require('express');
const studentRoute = express.Router();
const mongoose = require('mongoose')
const database = require('../database');

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
let Entourage = require('../models/Entourage');
let Photo = require('../models/Photo');
const { led } = require('../database');
const { photoSchema } = require('../models/Photo');

 
const multer = require('multer');
const upload = multer({dest : 'uploads/'})
const { uploadFile} = require('../s3');
const { resourceLimits } = require('worker_threads');


studentRoute.route('/getEntourage').get((req, res) => {
    Entourage.find((error, data) => {
     if (error) {
        console.log(error)
       return next(error)
     } else {
        res.json(data)
     }
})
});


studentRoute.post('/test',upload.single('image'), async (req,res)=> {
   const file = req.file
   console.log(req.body)
   const result = await uploadFile(file)
   await unlinkFile(file.path)
   console.log(result)
   res.send({imagePath: `/images/${result.Key}`})

   var conn2 = mongoose.createConnection(database.led);
   conn2.model('Photo', new mongoose.Schema({
      imageKey : { type : String, default : ''},
      message: {type: String, default :''}
    })).create({
       imageKey:result.Key,
       message:req.body.message
    })

   
  
 })


studentRoute.route('/getEntourageByName/:q').get((req, res) => {
    Entourage.find({ Name: { $regex: req.params.q }, Attending:undefined},(error, data) => {
     if (error) {
        console.log(error)
       return next(error)
     } else {
        res.json(data)
     }
})
});

studentRoute.route('/getById/:q').get((req, res) => {
    Entourage.find({ id: req.params.q},(error, data) => {
     if (error) {
        console.log(error)
       return next(error)
     } else {
        res.json(data)
     }
   })
});

studentRoute.route('/update').put((req, res) => {
    Entourage.findByIdAndUpdate(req.body._id,{ Attending:req.body.Attending },{},(error, data) => {
     if (error) {
        console.log(error)
       return next(error)
     } else {
        res.json(data)
     }
   })
});

studentRoute.route('/updateVaccine').put((req, res) => {
    Entourage.findByIdAndUpdate(req.body._id,{ Vaccinated:req.body.Vaccinated },{},(error, data) => {
     if (error) {
        console.log(error)
       return next(error)
     } else {
        res.json(data)
     }
   })
});


studentRoute.route('/updateNo').put((req, res) => {
    Entourage.findByIdAndUpdate(req.body._id,{ Phone:req.body.Phone },{},(error, data) => {
     if (error) {
        console.log(error)
       return next(error)
     } else {
        res.json(data)
     }
   })
});



studentRoute.route('/updateMessage').put((req, res) => {
    Entourage.findByIdAndUpdate(req.body._id,{ Message :req.body.Message },{},(error, data) => {
     if (error) {
        console.log(error)
       return next(error)
     } else {
        res.json(data)
     }
   })
});





module.exports = studentRoute;
