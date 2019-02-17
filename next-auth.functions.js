/* eslint-disable no-underscore-dangle */
/**
 * This file defines functions NextAuth to look up, add and update users.
 *
 * It returns a Promise with the functions matching these signatures:
 *
 * {
 *   find: ({
 *     id,
 *     email,
 *     emailToken,
 *     provider,
 *     poviderToken
 *   } = {}) => {},
 *   update: (user) => {},
 *   insert: (user) => {},
 *   remove: (id) => {},
 *   serialize: (user) => {},
 *   deserialize: (id) => {}
 * }
 *
 * Each function returns Promise.resolve() - or Promise.reject() on error.
 */
const NeDB = require('nedb');

module.exports = () => new Promise((resolve, reject) => {
  const collection = new NeDB({
    autoload: true,
  });
  // eslint-disable-next-line
  collection.loadDatabase(err => {
    if (err) return reject(err);
    resolve(collection);
  });
}).then(usersCollection => Promise.resolve({
  // If a user is not found find() should return null (with no error).
  find: ({ id, email, emailToken, provider } = {}) => {
    let query = {};

    // Find needs to support looking up a user by ID, Email, Email Token,
    // and Provider Name + Users ID for that Provider
    if (id) {
      query = {
        _id: id,
      };
    } else if (email) {
      query = {
        email,
      };
    } else if (emailToken) {
      query = {
        emailToken,
      };
    } else if (provider) {
      query = {
        [`${provider.name}.id`]: provider.id,
      };
    }

    return new Promise((resolve, reject) => {
      usersCollection.findOne(query, (err, user) => {
        if (err) return reject(err);
        return resolve(user);
      });
    });
  },

  // The user parameter contains a basic user object to be added to the DB.
  // The oAuthProfile parameter is passed when signing in via oAuth.
  //
  // The optional oAuthProfile parameter contains all properties associated
  // with the users account on the oAuth service they are signing in with.
  //
  // You can use this to capture profile.avatar, profile.location, etc.
  insert: user => new Promise((resolve, reject) => {
    usersCollection.insert(user, (err, response) => {
      if (err) return reject(err);

      // Mongo Client automatically adds an id to an inserted object, but
      // if using a work-a-like we may need to add it from the response.
      // eslint-disable-next-line
      if (!user._id && response._id) user._id = response._id;

      return resolve(user);
    });
  }),

  // The user parameter contains a basic user object to be added to the DB.
  // The oAuthProfile parameter is passed when signing in via oAuth.
  //
  // The optional oAuthProfile parameter contains all properties associated
  // with the users account on the oAuth service they are signing in with.
  //
  // You can use this to capture profile.avatar, profile.location, etc.
  update: user => new Promise((resolve, reject) => {
    usersCollection.update(
      {
        _id: user._id,
      },
      user,
      {},
      (err) => {
        if (err) return reject(err);
        return resolve(user);
      },
    );
  }),

  // The remove parameter is passed the ID of a user account to delete.
  //
  // This method is not used in the current version of next-auth but will
  // be in a future release, to provide an endpoint for account deletion.
  remove: id => new Promise((resolve, reject) => {
    usersCollection.remove(
      {
        _id: id,
      },
      (err) => {
        if (err) return reject(err);
        return resolve(true);
      },
    );
  }),

  // Seralize turns the value of the ID key from a User object
  serialize: (user) => {
    // Supports serialization from Mongo Object *and* deserialize() object
    // Handle responses from deserialize()
    if (user.id) return Promise.resolve(user.id);
    // Handle responses from find(), insert(), update()
    if (user._id) return Promise.resolve(user._id);
    return Promise.reject(new Error('Unable to serialise user'));
  },

  // Deseralize turns a User ID into a normalized User object that is
  // exported to clients. It should not return private/sensitive fields,
  // only fields you want to expose via the user interface.
  deserialize: id => new Promise((resolve, reject) => {
    usersCollection.findOne(
      {
        _id: id,
      },
      (err, user) => {
        if (err) return reject(err);

        // If user not found (e.g. account deleted) return null object
        if (!user) return resolve(null);

        return resolve({
          id: user._id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          admin: user.admin || false,
        });
      },
    );
  }),
}));
