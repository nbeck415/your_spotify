const a = require('./album');
const art = require('./artist');
const u = require('./user');
const h = require('./history');
const t = require('./track');

module.exports = {
  ...a,
  ...art,
  ...u,
  ...h,
  ...t,
};
