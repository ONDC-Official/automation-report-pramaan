const { on_search } = require("./on_search");
const { on_select } = require("./on_select");
const { on_init } = require("./on_init");
const { on_confirm } = require("./on_confirm");
const { on_update } = require("./on_update");
const { on_status } = require("./on_status");
const { on_support } = require("./on_support");
const { updateForeClosureTests } = require("./on_updateForeClosure");
const { missedEMIPaymentTests } = require("./on_updateMissedEmipayment");
const { prePartPaymentTests } = require("./on_updatePrePartPayment");

module.exports = {
  on_search,
  on_select,
  on_init,
  on_confirm,
  on_update,
  updateForeClosureTests,
  missedEMIPaymentTests,
  prePartPaymentTests,
  on_status,
  on_support,
};
