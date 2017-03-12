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

  if(instance.state.get('show-frutas')) {
    return Products.find({$and: [{ checked:{$ne: true}, sitio:{ $eq:"Fruteria"}}]}, {sort: {checked: 1, createdAt: -1}});
  }
  else if(instance.state.get('show-congelados')) {
    return Products.find({$and: [{checked: {$ne: true}, sitio: {$eq:"Congelados"}}]}, {sort: {checked:1, createdAt: -1}});
  }
  else if(instance.state.get('show-carnes')) {
    return Products.find({$and: [{checked: {$ne: true}, sitio: {$eq:"Carnes"}}]}, {sort: {checked:1, createdAt: -1}});
  }
  else if(instance.state.get('show-bebidas')){
    return Products.find({$and: [{checked: {$ne: true}, sitio: {$eq:"Bebidas"}}]}, {sort: {checked:1, createdAt: -1}});
  }
  else if(instance.state.get('show-postres')){
    return Products.find({$and: [{checked: {$ne: true}, sitio: {$eq:"Postres"}}]}, {sort:{checked:1, createdAt: -1}});
  }
  else if(instance.state.get('show-all')){
  return Products.find({ checked: { $ne: true }}, { sort: { checked: 1 , createdAt: -1} });
  }
  else{
  return Products.find({ checked: { $ne: true } }, { sort: { checked:1, createdAt: -1 } });
  }
}
  else {
    if(instance.state.get('show-frutas')) {
      return Products.find({sitio: {$eq:"Fruteria"}}, {sort:{checked:1, createdAt: -1}});
    };
    if(instance.state.get('show-congelados')) {
      return Products.find({sitio: {$eq:"Congelados"}}, {sort:{checked:1, createdAt: -1}});
    };
    if(instance.state.get('show-carnes')){
      return Products.find({sitio: {$eq:"Carnes"}}, {sort: {checked: 1, createdAt: -1}});
    };
    if(instance.state.get('show-bebidas')){
      return Products.find({sitio: {$eq:"Bebidas"}}, {sort: {checked: 1, createdAt: -1}});
    };
    if(instance.state.get('show-postres')){
      return Products.find({sitio: {$eq:"Postres"}}, {sort: {checked: 1, createdAt: -1}});
    };
    if(instance.state.get('show-all')){
      return Products.find({}, {sort: {checked: 1, createdAt: -1}});
    };


// Otherwise, return all of the tasks

return Products.find({}, { sort: { createdAt: -1 } });

}
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
    target.numero.value = 0;
  },
  'change .hide-completed input'(event, instance) {

  instance.state.set('hideCompleted', event.target.checked);

},
'change .show-all input'(event, instance) {
instance.state.set('show-all', event.target.checked);
instance.state.set('show-frutas', false);
instance.state.set('show-congelados', false);
instance.state.set('show-carnes', false);
instance.state.set('show-bebidas', false);
instance.state.set('show-postres', false);
},
'change .show-frutas input'(event, instance) {
instance.state.set('show-all', false);
instance.state.set('show-frutas', event.target.checked);
instance.state.set('show-congelados', false);
instance.state.set('show-carnes', false);
instance.state.set('show-bebidas', false);
instance.state.set('show-postres', false);
},
'change .show-congelados input'(event, instance) {
instance.state.set('show-all', false);
instance.state.set('show-frutas', false);
instance.state.set('show-congelados', event.target.checked);
instance.state.set('show-carnes', false);
instance.state.set('show-bebidas', false);
instance.state.set('show-postres', false);
},
'change .show-carnes input'(event, instance) {
instance.state.set('show-all', false);
instance.state.set('show-frutas', false);
instance.state.set('show-congelados', false);
instance.state.set('show-carnes', event.target.checked);
instance.state.set('show-bebidas', false);
instance.state.set('show-postres', false);
},
'change .show-bebidas input'(event, instance) {
instance.state.set('show-all', false);
instance.state.set('show-frutas', false);
instance.state.set('show-congelados', false);
instance.state.set('show-carnes', false);
instance.state.set('show-bebidas', event.target.checked);
instance.state.set('show-postres', false);
},
'change .show-postres input'(event, instance) {
instance.state.set('show-all', false);
instance.state.set('show-frutas', false);
instance.state.set('show-congelados', false);
instance.state.set('show-carnes', false);
instance.state.set('show-bebidas', false);
instance.state.set('show-postres', event.target.checked);
},

});
