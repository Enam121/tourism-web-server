const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const app = express();
const port = process.env.PORT || 7000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yatx1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

  try {

    await client.connect();

    const database = client.db('TourX');
    const serviceCollection = database.collection('services');
    const orderCollection = database.collection('orders');

    //GET API
    app.get('/services', async (req, res) => {
      const cursor = serviceCollection.find({});
      const allService = await cursor.toArray()
      res.send(allService)
    });

    //GET API for single item
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    //GET API (get orders)
    app.get('/orders', async (req, res) => {
      const cursor = await orderCollection.find({}).toArray();
      res.send(cursor)
    });

    //POST API (post user info & order)
    app.post('/orders', async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json(result)
    });

    //POST API (add a new service)
    app.post('/services', async (req, res) => {
      const service = req.body;
      const result = await serviceCollection.insertOne(service);
      res.json(result);
    });

    //DELETE API
    app.delete('/orders/:name', async (req, res) => {
      const name = req.params.name;
      const query = { name: name };
      const result = await orderCollection.deleteOne(query);
      res.json(result);
    });



    // // GET API (get user order)
    // app.post('/orders/my-order', async (req, res) => {
    //   const email = req.body;
    //   console.log(email)
    //   // const query = { email: email }
    //   // const result = await orderCollection.find(query).toArray();
    //   // console.log(result)
    //   // res.send(result)
    // })



  }
  finally {

  }

}

run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('tourism server is running ')
})

app.listen(port, () => {
  console.log('server is runnig at port:', port)
})