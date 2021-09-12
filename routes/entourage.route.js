const express = require('express');
const studentRoute = express.Router();

// Student model
let Entourage = require('../models/Entourage');

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


studentRoute.route('/getEntourageByName/:q').get((req, res) => {
    Entourage.find({ Name: { $regex: req.params.q }},(error, data) => {
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
