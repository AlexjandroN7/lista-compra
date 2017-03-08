import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Products = new Mongo.Collection('products');


if (Meteor.isServer) {

  // This code only runs on the server

  Meteor.publish('products', function productsPublication() {

    return Products.find();

  });

}

Meteor.methods({

  'products.insert'(text, numero, sitio) {

    check(text, String);




    // Make sure the user is logged in before inserting a task

    if (! this.userId) {

      throw new Meteor.Error('not-authorized');

    }

    Products.insert({

      text,

      numero,

      sitio,

      createdAt: new Date(),

      owner: this.userId,

      username: Meteor.users.findOne(this.userId).username,

    });

  },

  'products.remove'(taskId) {

    check(taskId, String);

    const product = Products.findOne(taskId);
    if (product.owner != this.userId) {

      alert("No esta autorizado para borrar este producto");
      throw new Meteor.Error('not-authorized');

    }

    Products.remove(taskId);

  },

  'products.setChecked'(taskId, setChecked) {

    check(taskId, String);

    check(setChecked, Boolean);



    Products.update(taskId, { $set: { checked: setChecked } });

  },

});
