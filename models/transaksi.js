const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var transaksiSchema = new Schema({
    id_penjaga: {
        type: String,
        reqired: true
    },
    id_member: {
        type: String,
        required: true
    },
    nomor_polisi: {
        type: String,
        required: true
    },
    jenis_mobil: {
        type: String,
        required: true
    },
    status_parkir: {
        type: String,
        required: true
    },
    spot_parkir: {
        type: String,
        required: true
    },
    jam_masuk: {
        type: Date,
        required: true
    },
    jam_keluar: {
        type: Date,
        required: true
    },
    tarif: {
        type: Currency,
        required: true,
        min: 0
    }
});

var transaksi = mongoose.model("Transaksi", transaksiSchema);
module.exports = { transaksi };