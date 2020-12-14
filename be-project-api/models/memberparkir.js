const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var mobilSchema = new Schema({
    nomor_polisi:  {
        type: String,
        required: true
    },
    jenis_mobil:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var memberparkirSchema = new Schema({
    nik_member: {
        type: String,
        required: true,
        unique: true
    },
    nama_member: {
        type: String,
        required: true
    },
    jeniskelamin_member: {
        type: String,
        required: true
    },
    username_member: {
        type: String,
        required: true,
        unique: true
    },
    password_member: {
        type: String,
        required: true
    },
    mobil:[mobilSchema]
}, {
    timestamps: true
});

var memberparkir = mongoose.model('MemberParkir', memberparkirSchema);
var mobil = mongoose.model('Mobil', mobilSchema);

module.exports = {memberparkir, mobil}