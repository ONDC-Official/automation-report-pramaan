// Run with NODE_PATH pointing to the existing Mocha/Chai dependencies:
// node --test tests/logistics-v120-sync-response.test.js
const {test} = require('node:test');
const assert = require('node:assert/strict');
const buyer = require('../buyerNPTestAPI/src/centralizedUtilities/responseVerification');
const seller = require('../sellerNPTestAPI/src/centralizedUtilities/responseVerification');
const actions = ['search', 'init', 'confirm', 'update', 'cancel', 'status', 'track'];

function verify(side, action, response, profile = {}, missing = false) {
    const forward = {
        domain: 'nic2004:60232', core_version: '1.2.0', action,
        message_id: '550e8400-e29b-41d4-a716-446655440000', ...profile,
    };
    const callback = {...forward, action: 'on_' + action};
    const context = side === 'buyer' ? forward : callback;
    const paired = side === 'buyer' ? callback : forward;
    const suite = (side === 'buyer' ? buyer : seller)({context}, missing ? [] : [{
        action: paired.action, message_id: paired.message_id,
        request: {context: paired}, response,
    }], {type: 'LOGISTICS'});
    const failures = [];
    for (const check of suite.tests) {
        try { check.fn(); } catch (error) { failures.push({title: check.title, error}); }
    }
    return {failures, titles: suite.tests.map(check => check.title)};
}

for (const side of ['buyer', 'seller']) {
    for (const action of actions) {
        test(`${side} ${action}: context-free 1.2.0 ACK and NACK validate`, () => {
            for (const status of ['ACK', 'NACK']) {
                const response = {message: {ack: {status}}};
                if (status === 'NACK') response.error = {
                    type: 'DOMAIN-ERROR', code: '65001', message: 'Synthetic rejection',
                };
                const result = verify(side, action, response);
                assert.deepEqual(result.failures.map(x => x.title), []);
                assert(result.titles.length >= 4, 'ACK checks must still run');
                assert(result.titles.every(title => !title.includes('undefined_response')));
            }
        });
    }
    test(`${side}: malformed ACK/NACK content remains rejected`, () => {
        for (const response of [{}, {message: {}}, {message: {ack: {status: 'OK'}}},
            {message: {ack: {status: 1}}},
            {message: {ack: {status: 'NACK'}}, error: {type: 1, code: 2, message: 3}}]) {
            assert(verify(side, 'init', response).failures.length > 0);
        }
    });
    test(`${side}: published 1.2.0 envelope rejects extra response context`, () => {
        assert(verify(side, 'init', {context: {}, message: {ack: {status: 'ACK'}}})
            .failures.length > 0);
    });
    test(`${side}: missing required paired response remains a failure`, () => {
        for (const action of ['search', 'init', 'confirm']) {
            assert(verify(side, action, {}, {}, true).failures.length > 0);
        }
    });
    test(`${side}: context requirements for other profiles are unchanged`, () => {
        for (const profile of [
            {domain: 'ONDC:LOG10', core_version: '1.2.5'},
            {domain: 'ONDC:RET10', core_version: '1.2.0'},
            {domain: 'nic2004:60232', core_version: '1.1.0'},
            {domain: 'nic2004:60232', core_version: undefined},
        ]) {
            const result = verify(side, 'init', {message: {ack: {status: 'ACK'}}}, profile);
            assert(result.failures.some(x => x.title.includes("'context'")));
        }
    });
    test(`${side}: valid context-bearing 1.2.5 response still validates`, () => {
        const profile = {domain: 'ONDC:LOG10', core_version: '1.2.5'};
        const context = {
            ...profile, country: 'IND', city: 'std:080',
            action: side === 'seller' ? 'init' : 'on_init',
            bap_id: 'buyer.example.test', bap_uri: 'https://buyer.example.test',
            bpp_id: 'seller.example.test', bpp_uri: 'https://seller.example.test',
            transaction_id: '550e8400-e29b-41d4-a716-446655440001',
            message_id: '550e8400-e29b-41d4-a716-446655440000',
            timestamp: '2026-01-01T00:00:00.000Z', ttl: 'PT30S',
        };
        const result = verify(side, 'init', {context, message: {ack: {status: 'ACK'}}}, profile);
        assert.deepEqual(result.failures.map(x => x.title), []);
    });
}
