const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const memberparkir = require('../models/memberparkir');

/*
router.get('/register', function(req,res)){
    //Codingan dari FE untuk tampilan register
}*/

router.post('/register', function(req,res){
    const nik_member = req.body.nik_member;
    const nama_member = req.body.nama_member;
    const jeniskelamin_member = req.body.jeniskelamin_member;
    const username_member = req.body.username_member;
    const password_member = req.body.password_member;
    const mobil = req.body.mobil;

    bcrypt.hash(req.body.password_member, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            });
        }else{
            let member = new memberparkir()
            member.nik_member = nik_member,
            member.nama_member = nama_member,
            member.jeniskelamin_member = jeniskelamin_member,
            member.username_member = username_member,
            member.password_member = password_member,
            member.mobil = mobil
            member.save()
            .then(member =>{
                res.json({
                    message: 'Berhasil Register'
                })
            })
        }
    })

});

/*
router.get('/login', function(req,res)){
    //Codingan dari FE untuk tampilan register
}*/
router.post('/login', function(req,res){
    AuthController.login
});

module.exports = router;