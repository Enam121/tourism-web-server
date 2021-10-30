const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
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

    app.get('/hellow', (req, res) => {
      res.send('hello world')
    })

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