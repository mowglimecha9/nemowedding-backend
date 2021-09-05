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
    Entourage.find({ Name: { $regex: req.params.q } },(error, data) => {
     if (error) {
        console.log(error)
       return next(error)
     } else {
        res.json(data)
     }
})
});



module.exports = studentRoute;
