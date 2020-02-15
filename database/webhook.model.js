const mongoose=require("mongoose");
const webhook=mongoose.Schema({
    name:String,
    payload:Object,
    addedby:String,
    designation:String
},{
    timestamps:true
});
module.exports=mongoose.model('webhook',webhook)