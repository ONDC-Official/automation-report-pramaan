const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");

module.exports = async function search({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite(`Search Request Verification`);
        contextTests(context, "search", testSuite, logs);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist.to.be.an("object");
        }));
        // message.intent.category
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent' which is an object", function () {
            expect(message.intent).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.category' which is an object", function () {
            expect(message.intent.category).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.category.descriptor' which is an object", function () {
            expect(message.intent.category.descriptor).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.category.descriptor.code' which is a string", function () {
            expect(message.intent.category.descriptor.code).to.exist.and.to.be.a("string");
        }));

        // message.intent.fulfillment
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment' which is an object", function () {
            expect(message.intent.fulfillment).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(
            new Mocha.Test("Verify the presence of 'message.intent.fulfillment.stops' which is an array", function () {
                expect(message.intent.fulfillment.stops).to.exist.and.to.be.an("array");
            }));

        if (message?.intent?.fulfillment?.stops && message.intent.fulfillment.stops.length > 0) {
            message.intent.fulfillment.stops.forEach((stopItem, stopIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}]' which is an object`, function () {
                    expect(stopItem).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].type' which is a string`, function () {
                    expect(stopItem.type).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location' which is an object`, function () {
                    expect(stopItem.location).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].time' which is an object`, function () {
                    expect(stopItem.time).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].time.range' which is an object`, function () {
                    expect(stopItem.time.range).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].time.range.start' which is a string`, function () {
                    expect(stopItem.time.range.start).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].time.range.end' which is a string`, function () {
                    expect(stopItem.time.range.end).to.exist.and.to.be.a("string");
                }));

                // messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location.gps' which is a string and valid coordinates`, function () {
                //     const gpsValue = stopItem.location.gps;

                //     const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
                //     expect(gpsValue).to.exist.and.to.be.a("string");
                //     expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
                // }));
            });
        }
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.vehicle' which is an object", function () {
            expect(message.intent.fulfillment.vehicle).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.vehicle.category' which is a string `, function () {
            expect(message.intent.fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["SITE", "TWO_WHEELER", "AUTO_RICKSHAW", "CAB"]);
        }));
        //message.intent.payment
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.payment' which is an object", function () {
            expect(message.intent.payment).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.payments.collected_by' which is a string`, function () {
            expect(message.intent.payment.collected_by).to.exist.and.to.be.a("string");
        }));
        //message.intent.tag
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of'message.intent' should have a property named 'tags' which is an array`, function () {
            expect(message.intent).to.have.property("tags").that.is.an("array");
        }));

        if (message?.intent?.tags && message?.intent?.tags.length > 0) {
            message.intent.tags.forEach((tag, tagIndex) => {
                messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.intent.tags[${tagIndex}]' should have properties 'display', 'descriptor', and 'list'`, function () {
                    expect(tag).to.have.property("display").that.is.a("boolean");
                    expect(tag).to.have.property("descriptor").that.is.an("object");
                    expect(tag).to.have.property("list").that.is.an("array");
                }));

                messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.intent.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tag.descriptor).to.have.property("code").that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.intent.tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                    expect(tag.descriptor).to.have.property("name").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.intent.tags[${tagIndex}].list' should be a non-empty array`, function () {
                    expect(tag.list).to.be.an("array").that.is.not.empty;
                }));

                tag.list.forEach((listItem, listItemIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.tags[${tagIndex}].list[${listItemIndex}]' should have properties 'descriptor' and 'value'`, function () {
                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                        expect(listItem).to.have.property("value").that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.intent.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${listItem.descriptor.code}'`, function () {
                        expect(listItem.descriptor.code).to.equal(listItem.descriptor.code);
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                        expect(listItem.value).to.be.a("string").that.is.not.empty;
                    }));
                });
            });
        }
        return [testSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
};
