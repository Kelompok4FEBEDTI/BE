const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {memberparkir} = require('../models/memberparkir');
const {signToken} = require('../helpers/jwt');
const {comparePassword} =require('../helpers/bcrypt');

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
    console.log(req.body)
    const {password_member, username_member} = req.body
    const inputPassword = password_member
        try {
            memberparkir.findOne({
                username_member
            }).then((e)=>{
                if(comparePassword(password_member,e.password_member)){
                    const payload = {
                        username_member: memberlogin.username_member
                    }
                    const token = signToken(payload)
                    res.status(200).json({
                        token,
                        message: 'Selamat anda telah berhasil login!',
                        nama: e.username_member
                    })
                } else {
                    res.status(404).json({
                        message: 'User danPassword salah'
                    })
                }
                
            }).catch(e=>{
                res.status(404).json({
                    message: 'User belum terdaftar'
                })
            })

        } catch(err){
            console.log(err)
            res.status(500).json(err)
        }
});

module.exports = router;