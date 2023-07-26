const mongoose = require('mongoose');

const InvoiceDataSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    cost:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    date:  { 
        type : Date,
        default: Date.now 
    }
} , {_id:false});

const Invoice = mongoose.model('InvoiceData', InvoiceDataSchema);

module.exports = {
  Invoice
};