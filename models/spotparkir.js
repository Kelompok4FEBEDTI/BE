const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var spotSchema = new Schema({
    lantai:{
        type: Number,
        required: true
    },
    no_parkir:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Spotparkirs = mongoose.model("Spotparkir", spotSchema);
module.exports = Spotparkirs;