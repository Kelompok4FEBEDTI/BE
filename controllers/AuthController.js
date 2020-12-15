const memberparkir = require('../models/memberparkir');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req,res,next) =>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }

        let member = new memberparkir()
        member.nik_member = req.body.nik_member;
        member.nama_member = req.body.nama_member;
        member.jeniskelamin_member = req.body.jeniskelamin_member;
        member.username_member = req.body.username_member;
        member.password_member = hashedPass;
        member.mobil = req.body.mobil;
        member.save()
        .then(user => {
            res.json({
                messaage: 'Berhasil Register'
            })
        })
    })
    .catch(error =>{
        res.json({
            messaage: 'Terdapat Error!'
        })
    })
}

const login = (req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;

    memberparkir.findOne({$or: [{username_member: username},{nik_member: username}]})
    .then(user=>{
        if (user){
            bcrypt.compare(password, user.password, function(err,result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if (result){
                    let token = jwt.sign({nama_member: user.nama_member}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Berhasil Login',
                        token: token
                    })
                }else{
                    res.json({
                        message: 'Password Salah'
                    })
                }
            })
        }
    })
}

module.exports = {
    register, login
}