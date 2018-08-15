const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const createRouter = function (collection) {
  const router = express.Router();


  //INDEX
  router.get('/', (req, res) => {
    collection.find().toArray()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      console.error(err);
    });
  });

  //SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: ObjectId(id) })
      .then((doc) => {
        res.json(doc);
      })
  });

  //DESTROY
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: ObjectId(id) })
      .then(() => {
        collection.find().toArray()
          .then((docs) => res.json(docs));
      })
  })

  //CREATE
  router.post('/', (req,res) => {
    const newItem = req.body
    collection.insertOne(newItem)
    .then(() => {
      collection.find().toArray()
      .then((docs) =>{
        res.json(docs)
      })
    })
    .catch((err) => {
      console.error(err);
    })
  });

return router;


}

module.exports = createRouter;
