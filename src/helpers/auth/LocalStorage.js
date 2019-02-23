/* eslint-disable global-require */
/**
 * Storage-Implementation for the client side, to store information in clients "webStorage" instead of cookies
 */
export default class Storage {
  constructor() {
    this.clientside = process.browser;
    if (this.clientside) {
      const webStorage = require('webStorage');
      this.storage = webStorage.createInstance({
        name: 'session',
      });
    }
  }

  getItem(key) {
    if (!this.clientside) return null;
    return this.storage.getItem(key);
  }

  setItem(key, value) {
    if (this.clientside) this.storage.setItem(key, value);
  }

  removeItem(key) {
    if (this.clientside) this.storage.removeItem(key);
  }

  get length() {
    if (!this.clientside) return 0;
    return this.storage.length;
  }

  key(index) {
    if (!this.clientside) return null;
    return this.storage.keys()[index];
  }
}
