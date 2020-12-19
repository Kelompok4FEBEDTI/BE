const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Spotparkirs = require('../models/spotparkir');
const { remove } = require('../models/spotparkir');

const spotparkirRouter = express.Router();

spotparkirRouter.use(bodyParser.json());

spotparkirRouter.route('/')
    .get((req, res, next)=>{
        Spotparkirs.find({}).then((spotparkir)=>{
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(spotparkir);
        },(err)=>next(err))
        .catch((err) => next (err));
    })
    .post((req, res, next)=>{
        Spotparkirs.create(req.body).then((spotparkir)=>{
            console.log('Penambahan Slot Parkir Berhasil');
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(spotparkir);
        },(err)=>next(err))
        .catch((err) => next (err));
    })
    .put((req,res,next)=>{
        res.statusCode = 403;
        console.log("Update Tidak Tersedia Di Bagian Ini");
    })
    .delete((req,res,next)=>{
        res.statusCode = 403;
        console.log("Delete Tidak Tersedia Di Bagian Ini");
    })

spotparkirRouter.route('/:spotparkirId')
    .get((req,res,next)=>{
        Spotparkirs.findById(req.params.spotparkirId).then((spotparkir)=>{
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(spotparkir);
        }, (err)=>{
            res.status(404).send(err);
        });
    })
    .post((req,res,next)=>{
        res.statusCode = 403;
        console.log('Post Tidak tersedia pada bagian ini');
    })
    .put((req,res,next)=>{
        Spotparkirs.findByIdAndUpdate(req.params.spotparkirId,{
            $set: req.body
        },{new: true})
        .then((spotparkir) => {
            res.status = 200;
            console.log('Spot Parkir Telah Diubah');
            res.setHeader('Content-type','application/json');
            res.json(spotparkir)
        })
    })
    .delete((req,res,next)=>{
        Spotparkirs.findByIdAndDelete(req.params.spotparkirId).then((resp)=>{
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        });
    });

module.exports = spotparkirRouter;