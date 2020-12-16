const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { transaksi } = require('../models/transaksi');

const transaksiRouter = express.Router();

transaksiRouter.use(bodyParser.json());

transaksiRouter.route('/')
    .get((req, res, next) => { // lihat data
        transaksi.find({}).then((Transaksi) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(Transaksi);
        }).catch((err) => {
            res.statusCode = 403;
            res.send(err);
        });
    })
    .post((req, res, next) => { // transaksi baru
        transaksi.create(req.body).then((TransaksiBaru) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(TransaksiBaru);
        }).catch((err) => {
            res.statusCode = 403;
            res.send(err);
        });
    })
    .put((req, res, next) => { // update, tidak bisa
        res.status = 403;
        res.setHeader('Content-type', 'application/json');
        res.end('Tidak support untuk PUT');
    })
    .delete((req, res, next) => { // hapus semua data transaksi
        transaksi.remove({}).then((Transaksi) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.end("Data transaksi telah terhapus semua");
        })
    });

transaksiRouter.route('/:transaksiId')
    .get((req, res, next) => { // lihat salah satu transaksi
        transaksi.findById(req.params.transaksiId).then((Transaksi) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(Transaksi);
        }).catch((err) => {
            res.statusCode = 403;
            res.send(err);
        });
    })
    .post((req, res, next) => { // tambah, dari sini tidak bisa
        res.status = 403;
        res.setHeader('Content-type', 'application/json');
        res.end('Tidak support untuk POST');
    })
    .put((req, res, next) => { // update salah satu transaksi
        transaksi.findByIdAndUpdate(req.params.transaksiId, {
            $set: req.body
        }, {
            new: true
        }).then((Transaksi) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(Transaksi);
        }).catch((err) => {
            res.statusCode = 403;
            res.send(err);
        });
    })
    .delete((req, res, next) => { // hapus salah satu transaksi
        transaksi.findByIdAndDelete(req.params.transaksiId).then(() => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.end('Data telah dihapus');
        }).catch((err) => {
            res.statusCode = 403;
            res.send(err);
        });
    });

module.exports = transaksiRouter;