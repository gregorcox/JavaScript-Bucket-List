const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const CreateRouter = require('./helpers/create_router.js');
const path = require('path');


const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));
app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
.then((client) =>{
  const db = client.db('bucket_list');
  const bucketCollection = db.collection('items');
  const bucketRouter = CreateRouter(bucketCollection);
  app.use('/api/bucketlist', bucketRouter);
})
.catch(console.err);

app.listen(3000, function()
{
  console.log(`listening on port ${this.address().port}`);
})
