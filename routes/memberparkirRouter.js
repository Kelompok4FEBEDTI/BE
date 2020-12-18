const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {hashPassword} = require('../helpers/bcrypt')

const {memberparkir, mobil} = require('../models/memberparkir');

const memberparkirRouter = express.Router();

memberparkirRouter.use(bodyParser.json());

memberparkirRouter.route('/')
    .get((req, res, next) => {
        memberparkir.find({}).then((MemberParkir) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(MemberParkir);
        });
    })
    .post((req, res, next) => { console.log(req.body)
        const { nik_member, nama_member, jeniskelamin_member,username_member} = req.body
        const newMember = {
            nik_member, 
            nama_member, 
            jeniskelamin_member,
            username_member, 
            password_member : hashPassword(req.body.password_member)
        }
        memberparkir.create(newMember).then((MemberParkir) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({data: MemberParkir.username_member});
        }).catch(err =>{
            console.log(err.message)
            res.status = 403;
            res.json(err.message)
        });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Tidak support untuk PUT');
    });
    // .delete((req, res, next) => {
    //     memberparkir.remove({}).then((MemberParkir) => {
    //         res.status = 200;
    //         res.setHeader('Content-type', 'application/json');
    //         res.json('Semua Data Telah Dihapus');
    //     });
    // }); FUNGSI DELETE ALL

memberparkirRouter.route('/:memberId')
.get((req, res, next) => {
    memberparkir.findById(req.params.memberId).then((MemberParkir) => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(MemberParkir);
    });
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Tidak support untuk POST');
})
.put((req, res, next) => {
    let update_password = false;
    const {nik_member, nama_member, jeniskelamin_member, username_member, password_member} = req.body;
    memberparkir.findById(req.params.memberId).then((e)=>{
        if(e.password_member != password_member){
            update_password = hashPassword(password_member);
        } else{
            update_password = password_member;
        }
    }) 
    memberparkir.findByIdAndUpdate(req.params.memberId, {
        $set: {
            nik_member,
            nama_member,
            jeniskelamin_member,
            username_member,
            password_member: update_password
        }
    }, {
        new: true
    }).then((MemberParkir) => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(MemberParkir);
    });
})
.delete((req, res, next) => {
    memberparkir.findByIdAndDelete(req.params.memberId).then(() => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.end('Data telah dihapus');
    });
});

memberparkirRouter.route('/:memberId/mobil')
.get((req, res, next) => {
    memberparkir.findById(req.params.memberId).then((MemberParkir) => {
        if (MemberParkir.mobil != null) {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(MemberParkir.mobil);
        } else {
            res.statusCode = 404;
            res.end('Mobil tidak ditemukan');
        }
    });
})
.post((req, res, next) => {            
    const newMobil = new mobil();
    newMobil.nomor_polisi = req.body.nomor_polisi;
    newMobil.jenis_mobil = req.body.jenis_mobil;
    memberparkir.findById(req.params.memberId, function(err, MemberParkir){
        MemberParkir.mobil.push(newMobil);
        MemberParkir.save().then((savedPostMobil) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(savedPostMobil);
        })
        .catch((err) => {
            res.statusCode = 403;
            res.send(err);
        });
    });
})
.put((req, res, next) => {             
    var id = req.params.memberId;
    memberparkir.findOne({'mobil._id' : id}, function(err, MemberParkir){
        MemberParkir.mobil.id(id).set(req.body)
        MemberParkir.save().then((savedPutMobil) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(savedPutMobil);
        })
        .catch((err) => {
            res.statusCode = 403;
            res.send(err);
        });
    });
})
.delete((req, res, next) => {          
    var id = req.params.memberId;
    memberparkir.findOne({'mobil._id' : id}, function(err, MemberParkir){
        MemberParkir.mobil.id(id).remove();
        MemberParkir.save().then((resp) => {
            res.status = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(resp);
        })
        .catch((err) => {
            res.statusCode = 403;
            res.send(err);
        });
    });
});

// (Searching untuk Nama)
// dishRouter.route('/name/:dishName')
// .get((req, res, next) => {
//     Dishes.findById(req.params.dishName)
//     .then((dish) => {
//         res.status = 200;
//         res.setHeader('Content-type', 'application/json');
//         res.json(dish);
//     });
// });

module.exports = memberparkirRouter;