const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {penjaga} = require('../models/penjaga');
const {hashPassword} = require('../helpers/bcrypt')

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
        const { nik, nama, username} = req.body
        const newPenjaga = {
            nik, 
            nama, 
            username, 
            password : hashPassword(req.body.password)
        }
        penjaga.create(newPenjaga).then((dataPenjaga)=>{
            res.status(200).json({
                data:dataPenjaga.username,
                message: `Data ${dataPenjaga.username} berhasil di create!`
            })
        },(err)=>{
            if (err.name == "MongoError" && err.code == 11000){
                res.status(422).send({ succes: false, error:"Data yang sama di temukan", value: err.keyValue});
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
        const {nik, nama, username, password} = req.body
        penjaga.findById(req.params.memberId).then((e)=>{
            if(e.password != password){
                update_password = hashPassword(password);
                penjaga.findByIdAndUpdate(req.params.memberId, {
                    $set: {
                        nik,
                        nama,
                        username,
                        password: update_password
                    }
                }, {
                    new: true
                }).then((MemberParkir) => {
                    res.status = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json({
                        data: MemberParkir,
                        msg: 'Berhasil Update Data. Password Berubah'
                    });
                });
            } else{
                update_password = password;
                memberparkir.findByIdAndUpdate(req.params.memberId, {
                    $set: {
                        nik,
                        nama,
                        username,
                        password: update_password
                    }
                }, {
                    new: true
                }).then((MemberParkir) => {
                    res.status = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json({
                        data: MemberParkir,
                        msg: 'Berhasil Update Data. Password tidak berubah'
                    });
                });
            }
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
