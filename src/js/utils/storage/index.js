/**
 * Uses the local storage to save, load, and remove data
 * @param {string} key - The key to save the data under in local storage
 * @param {any} value - The data to save to local storage
 * @returns {any} The data from local storage or null if it doesn't exist
 *  */

export default {
  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
