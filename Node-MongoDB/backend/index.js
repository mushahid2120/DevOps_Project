
const express= require('express');
const path=require('path');
const cors=require('cors')
const publicPath=path.join(__dirname,'public');
const app = express();
const port = 4000;




//Database Connection
// function initDB(){}
    const {MongoClient} =require('mongodb');
    const url='mongodb://mydb:27017'
    let db;
 MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db('node-react'); // Assign database instance
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit if unable to connect
  });


//Routing Related Stuff

app.use(express.static(publicPath));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.get('/home',(req,res)=>{
    res.send("Welcome to my page");
})


app.get('/page',(req,res)=>{
    res.sendFile(`${publicPath}/index.html`)
})

app.post('/submit',async(req,res)=>{
    const received=await req.body;
    console.log("whole Data is "+JSON.stringify(received)+"and Trimed Data is "+received.data);
    await storeData(received.data).
    catch((error)=>{console.log(error);}).
    finally(async ()=>{ await client.close(); });
    res.redirect('/page');
    // res.json({ message: "Data successfully stored!$$$$$$$$$$$$$" });
});

app.listen(port,()=>{
    // initDB();
    console.log("Webserver is running in this port : "+port);
});

function testing(data){
    console.log("Trimed Data: "+ data);
}


// Database Operation
async function storeData(data){

    // let result = await client.connect(url);
    // let db=result.db('node-react');
    let collection=db.collection('node-react-collection');
    let insertDoc=await collection.insertOne({"Respose": `${data}`});
    let response=await collection.find({}).toArray();
    console.log(response);
}


