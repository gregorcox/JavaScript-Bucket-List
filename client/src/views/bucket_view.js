const PubSub = require ('../helpers/pub_sub.js');

const BucketView = function(container, item) {
  this.container = container;
  this.item = item;
};

BucketView.prototype.render = function () {
  const itemContainer = document.createElement('div');
  itemContainer.id = 'item';

  const name = this.createHeading(this.item.name);
  itemContainer.appendChild(name);

  const deleteButton = this.createDeleteButton(this.item._id);
  itemContainer.appendChild(deleteButton);

  const checkBox = this.createCheckBox(this.item);
  itemContainer.appendChild(checkBox);



  this.container.appendChild(itemContainer);

};

BucketView.prototype.createHeading = function (textContent) {
  const heading = document.createElement('h5');
  heading.textContent = textContent;
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

BucketView.prototype.createCheckBox = function (item) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = "name";
  checkbox.value = 'value';
  checkbox.id = 'id';

  checkbox.addEventListener('change', (evt) =>{
    this.checkText(evt);
    console.log(evt);
    PubSub.publish('BucketView:checkbox-clicked', this.item);
  })

  return checkbox;

};

BucketView.prototype.checkText = function (evt) {


};

module.exports = BucketView;
