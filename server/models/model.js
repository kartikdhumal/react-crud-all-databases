const mongoose = require('mongoose');
const workschema = new mongoose.Schema({
    work:{
        type:String,
        required:true
    }
});

const Work = mongoose.model('Work',workschema);
module.exports = Work;