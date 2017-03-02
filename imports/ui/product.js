

import { Template } from 'meteor/templating';



import { Products } from '../api/products.js';



import './product.html';

Template.product.helpers({

  isOwner() {

    return this.owner === Meteor.userId();

  },

});

Template.product.events({
  'click .toggle-checked'() {

    // Set the checked property to the opposite of its current value

    Meteor.call('products.setChecked', this._id, !this.checked);

  },

  'click .delete'() {

    Meteor.call('products.remove', this._id);

  },

});
