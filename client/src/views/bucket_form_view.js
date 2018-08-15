const PubSub = require('../helpers/pub_sub.js');

const BucketFormView = function (form) {
  this.form = form;
}

BucketFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) =>{
    this.handleSumbit(evt);
  })
};

BucketFormView.prototype.handleSumbit = function (evt) {
  evt.preventDefault();
  const newItem = this.createItem(evt.target);
  PubSub.publish('BucketView:item-submitted', newItem);
  evt.target.reset();
};

BucketFormView.prototype.createItem = function (form) {
  const newItem = {
    name: form.name.value;
  }
  return newItem;
};

module.exports = BucketFormView;
