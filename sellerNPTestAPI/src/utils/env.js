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


const SELLER_DB_URI = process.env['SELLER_DB_URI'];
if (!SELLER_DB_URI) {
    console.log("No SELLER_DB_URI string. Set SELLER_DB_URI environment variable");
    process.exit(1);
}

const BUYER_TESTING_URI = process.env['BUYER_TESTING_URI'];
if (!BUYER_TESTING_URI) {
    console.log("No BUYER_TESTING_URI string. Set BUYER_TESTING_URI environment variable");
    process.exit(1);
}

const SELLER_TESTING_URI = process.env['SELLER_TESTING_URI'];
if (!SELLER_TESTING_URI) {
    console.log("No SELLER_TESTING_URI string. Set SELLER_TESTING_URI environment variable");
    process.exit(1);
}

const analyticsAPI = process.env['analyticsAPI']
if (!analyticsAPI) {
    console.log("No analyticsAPI string. Set 'analyticsAPI' environment variable.");
    process.exit(1);
}

const PW_LOGS_API = process.env['PW_LOGS_API'];
if (!PW_LOGS_API) {
    console.log("No PW_LOGS_API string. Set PW_LOGS_API environment variable");
    process.exit(1);
}

const PW_LOGS_API_KEY = process.env['PW_LOGS_API_KEY'];
if (!PW_LOGS_API_KEY) {
    console.log("No PW_LOGS_API_KEY string. Set PW_LOGS_API_KEY environment variable");
    process.exit(1);
}

module.exports = {
    MONGODB_URI,
    PORT,
    HOST,
    FLUSHPERIOD,
    analyticsAPI,
    SELLER_DB_URI,
    BUYER_TESTING_URI,
    SELLER_TESTING_URI,
    PW_LOGS_API,
    PW_LOGS_API_KEY
}