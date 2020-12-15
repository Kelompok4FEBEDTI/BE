const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var penjagaSchema = new Schema({
    nik: {
        type: String,
        required: true,
        unique: true
    },
    nama: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var penjaga = mongoose.model("penjaga", penjagaSchema);
module.exports = { penjaga }