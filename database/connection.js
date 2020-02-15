const mongoose=require('mongoose');
const url="mongodb://webhook:webhook@139.59.5.96:27.17/webhook"
mongoose.Promise=global.Promise;
module.exports=()=>
{
    return mongoose.connect(url,{
        useNewUrlParser:true
    }).then(()=>{
        console.log("database connection stablished");
    }).catch(err=>{
        console.log("database connection error",err);
        process.exit();
    })
}