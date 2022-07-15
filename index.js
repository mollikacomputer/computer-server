const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
// const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Testing Server for Computer Shop')
});
// user 	computer
// pass	BKgg3Jc1OfGnDCkR

const uri = "mongodb+srv://computer:BKgg3Jc1OfGnDCkR@cluster0.nfcaqyg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        // this 2 lines is for database connection and create serviceCollection
        await client.connect();
        const serviceCollection = client.db("computer").collection("service");
// add new service
        app.post('/service', async (req, res) => {
            const newService = req.body;
            console.log('adding new service', newService);
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        });

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log(`listent to prt ${port}`,);
});

