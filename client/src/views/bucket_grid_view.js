const PubSub = require('../helpers/pub_sub.js');
const BucketView = require('./bucket_view.js');

const BucketsView = function (container) {
  this.container = container;
}

BucketsView.prototype.bindEvents = function () {
  PubSub.subscribe('Items:data-loaded', (evt) => {
    this.render(evt.detail);
    console.log(evt.detail);
  });
};

BucketsView.prototype.render = function (items) {
  this.container.innerHTML = '';
  const bucketView = new BucketView(this.container);
  items.forEach((item) => bucketView.render(item));
};


module.exports = BucketsView;
