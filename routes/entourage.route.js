const express = require('express');
const studentRoute = express.Router();
const mongoose = require('mongoose')
const database = require('../database');

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
let Entourage = require('../models/Entourage');
const { led } = require('../database');

 
const multer = require('multer');
const upload = multer({dest : './uploads/'})
const { uploadFile,getFileStream} = require('../s3');
var conn2 = mongoose.createConnection(database.led);


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


studentRoute.post('/uploadPhoto',upload.single('image'), async (req,res)=> {
   const file = req.file
   console.log(req.body)
   const result = await uploadFile(file)
   await unlinkFile(file.path)
   console.log(result)
   res.send({imagePath: `/images/${result.Key}`})

   conn2.model('Photo', new mongoose.Schema({
      imageKey : { type : String, default : ''},
      message: {type: String, default :''}
    }),'photos').create({
       imageKey:result.Key,
       message:req.body.message
    })
  
 })

 studentRoute.route('/led-wall').get((req,res)=> {
   conn2.model('Photo', new mongoose.Schema({
      imageKey : { type : String, default : ''},
      message: {type: String, default :''}
    }),'photos').find({},(err,data) => {
       res.json(data);
    })
 });


 studentRoute.route('/images/:key').get((req, res) => {
   const readStream = getFileStream(req.params.key)

   readStream.pipe(res)
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
