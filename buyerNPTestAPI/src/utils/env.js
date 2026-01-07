require('dotenv').config();

const MONGODB_URI = process.env["MONGODB_URI"];
if (!MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

const PORT = process.env['PORT']
if (!PORT) {
    console.log("No PORT string. Set PORT environment variable.");
    process.exit(1);
}

const HOST = process.env['HOST']
if (!HOST) {
    console.log("No HOST string. Set HOST environment variable.");
    process.exit(1);
}

const FLUSHPERIOD = process.env['FLUSHPERIOD']
if (!FLUSHPERIOD) {
    console.log("No FLUSHPERIOD string. Set FLUSHPERIOD environment variable.");
    process.exit(1);
}

const analyticsAPI = process.env['analyticsAPI']
if (!analyticsAPI) {
    console.log("No analyticsAPI string. Set 'analyticsAPI' environment variable.");
    process.exit(1);
}

const BUYER_TESTING_URI = process.env['BUYER_TESTING_URI'];
if (!BUYER_TESTING_URI) {
    console.log("No BUYER_TESTING_URI string. Set BUYER_TESTING_URI environment variable");
    process.exit(1);
}

const PW_LOGS_API = "https://dev-automation.ondc.org/report";
if (!PW_LOGS_API) {
    console.log("No PW_LOGS_API string. Set PW_LOGS_API environment variable");
    process.exit(1);
}

const PW_LOGS_API_KEY = 'D33A76D111B4BDFCB96A2AC34B85E';
if (!PW_LOGS_API_KEY) {
    console.log("No PW_LOGS_API_KEY string. Set PW_LOGS_API_KEY environment variable");
    process.exit(1);
}

const PRAMAAN_SELLER_TESTING_API = "https://pramaan.ondc.org/beta/preprod/testing/seller";
if (!PRAMAAN_SELLER_TESTING_API) {
    console.log("No PRAMAAN_SELLER_TESTING_API string. Set PRAMAAN_SELLER_TESTING_API environment variable");
    process.exit(1);
}

module.exports = {
    MONGODB_URI,
    PORT,
    HOST,
    FLUSHPERIOD,
    analyticsAPI,
    BUYER_TESTING_URI,
    PW_LOGS_API,
    PW_LOGS_API_KEY,
    PRAMAAN_SELLER_TESTING_API
}