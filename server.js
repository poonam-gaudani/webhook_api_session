const express=require("express");
const bodyParser=require("body-parser");
const mongoclient=require("./database/connection")
const app=express()
const webhookmodel=require("./database/webhook.model");

mongoclient().then(()=>{
    console.log("connected")
}).catch(console.log)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/",(req,res)=>
{
res.send("welcome")
})

app.get("/api/webhook",(req,res)=>{
webhookmodel.find().then((wh)=>{
    res.json({
        flag:true,
        data:wh,
        message:"successfully fetched"
    });
}).catch(e=>{
    res.json({
        flag:false,
        data:null,
        message:e.message
    });
});
});

app.post("/api/webhook",(req,res)=>
{
    let body=req.body;
    webhookmodel.create(body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfully Inserted"    
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    });
});

app.put("/api/webhook/:id",(req,res)=>
{
    let body=req.body;
    webhookmodel.findByIdAndUpdate(req.params.id,body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfully Updated"    
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    });
});

app.delete("/api/webhook/:id",(req,res)=>
{
    let body=req.body;
    webhookmodel.findByIdAndRemove(req.params.id,body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfully Deleted"    
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    });
});

app.listen(3000)
console.log("server running on 3000")