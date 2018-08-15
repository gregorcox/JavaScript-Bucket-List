const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const BucketList = function(url){
  this.url = url;
}

BucketList.prototype.getData = function () {
  const request = new Request(this.url);
  request.get()
  .then((items) => {
    PubSub.publish('Items:data-loaded', items);
  })
  .catch(console.error);
};

BucketList.prototype.bindEvents = function () {
  PubSub.subscribe('BucketView:item-delete-clicked', (evt) =>{
    this.deleteItem(evt.detail);
  })
  PubSub.subscribe('BucketView:item-submitted', (evt) =>{
    this.postItem(evt.detail);
  })

  PubSub.subscribe('BucketView:checkbox-clicked', (evt) => {
    this.putItem(evt.detail);
    evt.detail.completed = true;
    this.changeComplete(evt.detail);
  })

};

BucketList.prototype.changeComplete = function (item) {
  item.name.textContent.strike();
};

BucketList.prototype.postItem = function (item) {
  const request = new Request(this.url);
  request.post(item)
  .then((items) => {
    PubSub.publish('Items:data-loaded', items);
  })
  .catch(console.error);
};

BucketList.prototype.deleteItem = function (itemId) {
  const request = new Request(this.url);
  request.delete(itemId)
  .then((items) =>{
    PubSub.publish('Items:data-loaded', items);
  })
  .catch(console.error);
};

BucketList.prototype.putItem = function (item) {
  const request = new Request(this.url);
  console.log(item);
  request.put(item._id, item)
  .then((items) => {
    PubSub.publish('Items:data-loaded', items);
  })
  .catch(console.error);
};

// BucketList.prototype.strikeText = function (itemId) {
//   const request = new Request(this.url);
//   request.get()
//   .then((items) => {
//     for (item of items) {
//       if (item._id === itemId) {
//         item.name.strike();
//       }
//     }
//   })
//   .catch(console.error);
// };

module.exports = BucketList;
