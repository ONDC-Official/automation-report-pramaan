const { on_search } = require("./on_search");
const { on_select } = require("./on_select");
const { on_init } = require("./on_init");
const { on_confirm } = require("./on_confirm");
const { on_update} = require("./on_update");
// const { on_status } = require("./on_status");
// const { on_cancel } = require("./on_cancel");

// const { on_updatePrePartPayment } = require("./on_updatePrePartPayment");
// const { on_updateMissedEmiPayment } = require("./on_updateMissedEmiPayment");
// const  { on_updateForeClosure }  = require("./on_updateForeClosure");
// const {on_status} = require ("./on_status");
// const {on_support} = require ("./on_support")

module.exports = {
  on_search,
  on_select,
  on_init,
  on_confirm,
  on_update,
  // on_status,
  // on_cancel


  // on_updatePrePartPayment,
  // on_updateMissedEmiPayment,
  // on_updateForeClosure,
  // on_status,
  // on_support,
};
