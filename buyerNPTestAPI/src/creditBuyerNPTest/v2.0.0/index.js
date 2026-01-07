const search = require("./search");
const select = require("./select");
const init = require("./init");
const confirm = require("./confirm");
const update_fulfillment = require('./update_fulfillment');
const update_pre_part_payment = require('./update_pre_part_payment');
const update_missed_emi_payment = require('./update_missed_emi_payment');
const update_foreClosure = require('./update_foreClosure');
const status = require("./status");
const support = require("./support");

module.exports = {
    search,
    select,
    init,
    confirm,
    update_fulfillment,
    update_foreClosure,
    status,
    update_pre_part_payment,
    update_missed_emi_payment,
    support
}