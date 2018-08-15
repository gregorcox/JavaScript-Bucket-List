const BucketFormView = require('./views/bucket_form_view.js')
const BucketGridView = require('./views/bucket_grid_view.js');
const BucketList = require('./models/bucket_list.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log("javascript loaded");
  const itemForm = document.querySelector('form#form');
  const bucketFormView = new BucketFormView(itemForm);
  bucketFormView.bindEvents();

  const bucketContainer = document.querySelector('div#items');
  const bucketGridView = new BucketGridView(bucketContainer);
  bucketGridView.bindEvents();

  const itemsURL = 'http://localhost:3000/api/bucketlist'
  const items = new BucketList(itemsURL);
  items.bindEvents();
  items.getData();
});
