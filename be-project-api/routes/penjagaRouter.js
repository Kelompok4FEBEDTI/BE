const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {penjaga} = require('../models/penjaga');

const penjagaRouter = express.Router();

penjagaRouter.use(bodyParser.json());

penjagaRouter.route('/')
    .get((req, res, next)=>{
        penjaga.find({}).then((dataPenjaga)=>{
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataPenjaga);
        },(err)=>{
            res.status(404).send(err);
        })
    })
    .post((req, res, next)=>{
        penjaga.create(req.body).then((dataPenjaga)=>{
            console.log('insert data berhasil');
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dataPenjaga);
        },(err)=>{
            if (err.name == "MongoError" && err.code == 11000){
                res.status(422).send({ succes: false, error:"Data yang sama di temukan", value: err.keyValue});S
            }
            else{
                res.status(404).send(err)
            };
        });
    })
    .put((req, res, next)=>{
        res.statusCode = 403;
        res.end('put tidak di support');
    })
    .delete((req, res, next)=>{
        penjaga.remove({}).then((resp)=>{
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        },(err)=>{
            res.status(404).send(err);
        });
    });

penjagaRouter.route('/:dishId')
    .get((req, res, next) => {
        // console.log(req.params.dishId);
        penjaga.findById(req.params.dishId)
            .then((dataPenjaga) => {
                res.status = 200;
                res.setHeader('Content-type','application/json');
                res.json(dataPenjaga);
            },(err)=>{
                res.status(404).send(err);
            });
    })
    .post((req, res, next)=>{
        res.statusCode = 403;
        res.end('Post tidak di support');
    })
    .put((req, res, next)=>{
        penjaga.findByIdAndUpdate(req.params.dishId,{
            $set: req.body
        }, {new: true})
        .then((dish) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(dish);
        },(err)=>{
            if (err.name == "MongoError" && err.code == 11000){
                res.status(422).send({ succes: false, error:"Data yang sama di temukan", value: err.keyValue});
            }
            else{
                res.status(404).send(err)
            };
        });
    })
    .delete((req, res, next)=>{
        penjaga.findByIdAndRemove(req.params.dishId)
        .then((resp) => {
            res.status = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp);
        },(err)=>{
            res.status(404).send(err);
            res.end('Failed to remove data');
        });
    });


module.exports = penjagaRouter;