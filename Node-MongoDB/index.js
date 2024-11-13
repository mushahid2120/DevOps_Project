
const express= require('express');
const path=require('path');
const publicPath=path.join(__dirname,'public');
const app = express();
const port = 400;




//Database Connection
const {MongoClient} =require('mongodb');
const url='mongodb://localhost:27017'
const client=new MongoClient(url);



//Routing Related Stuff

app.use(express.static(publicPath));
app.use(express.urlencoded({extended: true}));

app.get('/home',(req,res)=>{
    res.send("Welcome to my page");
})


app.get('/page',(req,res)=>{
    res.sendFile(`${publicPath}/index.html`)
})

app.post('/submit',async(req,res)=>{
    const received=await req.body;
    console.log("whole Data is "+JSON.stringify(received)+"and Trimed Data is "+received.data);
    storeData(received.data).
    catch((error)=>{console.log(error);}).
    finally(async ()=>{ await client.close(); });
    res.redirect('/page');
});

app.listen(port);

function testing(data){
    console.log("Trimed Data: "+ data);
}


// Database Operation
async function storeData(data){

    let result = await client.connect(url);
    let db=result.db('nodeweb');
    let collection=db.collection('nodowebcoll');
    let insertDoc=await collection.insertOne({"Respose": `${data}`});
    let response=await collection.find({}).toArray();
    console.log(response);
}


