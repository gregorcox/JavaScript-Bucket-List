const PubSub = require ('../helpers/pub_sub.js');

const BucketView = function(container) {
  this.container = container;
};

BucketView.prototype.render = function (item) {
  const itemContainer = document.createElement('div');
  itemContainer.id = 'item';

  const name = this.createHeading(item.name);
  itemContainer.appendChild(name);

  const deleteButton = this.createDeleteButton(item._id);
  itemContainer.appendChild(deleteButton);

  this.container.appendChild(itemContainer);

};

BucketView.prototype.createHeading = function (textContent) {
  const heading = document.createElement('h5');
  heading.textContent(textContent);
  return heading;
};

BucketView.prototype.createDeleteButton = function (itemId) {
  const button = document.createElement('button');
  button.classList.add('delete-btn');
  button.value = itemId;

  button.addEventListener('click', (evt) => {
    PubSub.publish('BucketView:item-delete-clicked', evt.target.value);
  });

  return button;
};

module.exports = BucketView;
