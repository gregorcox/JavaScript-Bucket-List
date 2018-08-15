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
  .catch(console.error);;
};

module.exports = BucketList;
