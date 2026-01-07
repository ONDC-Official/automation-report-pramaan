const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-uuid"));
const Mocha = require("mocha");
const { formatCheck } = require('./common')

const schema = require("./schema/context.schema");

module.exports = function contextTests(context, constants) {
    try {
        const contextTestSuite = new Mocha.Suite("Context Validation");

        contextTestSuite.addTest(new Mocha.Test("should have 'context' properties", function () {
            expect(context, "Request body shouldn't be null or undefined").to.exist;
        }));

        let validSchema;
        if (constants?.action === "search") {
            validSchema = schema.search;
        } else {
            validSchema = schema.others;
        }

        validSchema.required.forEach(prop => {
            contextTestSuite.addTest(new Mocha.Test(`'context' should have required property '${prop}'`, function () {
                expect(context).to.have.property(prop);
            }))
        })

        Object.keys(validSchema.properties).forEach(prop => {
            const property = validSchema?.properties[prop];

            if (property?.type) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_type]' 'context.${prop}' should be a ${property.type}${prop === "transaction_id" ? " (" + context[prop] + ")" : ""}`, function () {
                    expect(context[prop]).to.be.a(property.type);
                }));
            }

            if (property?.minLength) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_minLength] context.${prop}' should have minLength ${property.minLength}`, function () {
                    expect(context[prop]).to.have.lengthOf.at.least(property.minLength);
                }));
            }

            if (property?.enum) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_enum] context.${prop}' should be one of [${property.enum.join(', ')}]`, function () {
                    expect(property.enum).to.include(context[prop]);
                }));
            }

            if (property?.const) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_${property.const}] context.${prop}' should be '${property.const}'`, function () {
                    expect(context[prop]).to.equal(constants[property.const]);
                }));
            }

            if (property?.pattern) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_pattern] context.${prop}' should match pattern ${property.pattern}`, function () {
                    expect(context[prop], property?.errorMessage).to.match(new RegExp(property.pattern));
                }));
            }

            if (property?.not && property?.not?.pattern) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_notPattern] context.${prop}' should not match pattern ${property.not.pattern}`, function () {
                    expect(context[prop]).to.not.match(new RegExp(property.not.pattern));
                }));
            }

            if (property?.format) {
                const test = formatCheck({ value: context[prop], format: property.format, testName: `context.${prop}` })
                if (test) {
                    contextTestSuite.addTest(test)
                }
            }
        });

        return contextTestSuite;
    } catch (err) {
        console.log(err);
    }
}