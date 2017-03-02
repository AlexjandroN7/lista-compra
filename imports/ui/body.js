import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './body.html';
import { Products } from '../api/products.js';
import './product.js';


Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();
  Meteor.subscribe('products');

});

Template.body.helpers({

  products() {

    const instance = Template.instance();

if (instance.state.get('hideCompleted')) {

  // If hide completed is checked, filter tasks

  return Products.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });

}

// Otherwise, return all of the tasks

return Products.find({}, { sort: { createdAt: -1 } });

},



});

Template.body.events({

  'submit .new-product'(event) {

    // Prevent default browser form submit

    event.preventDefault();



    // Get value from form element

    const target = event.target;

    const text = target.text.value;

    const numero = target.numero.value;

    const sitio = target.sitio.value;



    // Insert a task into the collection


   Meteor.call('products.insert', text, numero, sitio);

    // Clear form

    target.text.value = '';

  },
  'change .hide-completed input'(event, instance) {

  instance.state.set('hideCompleted', event.target.checked);

},

});
