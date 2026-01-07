const Mocha = require("mocha");
const { expect } = require("chai");

function formatCheck({ value, format, testName, property }) {
    let test

    switch (format) {
        case 'url':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid URL`, function () {
                expect(value).to.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i);
            });
            break;
        case 'duration':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid RFC3339 duration`, function () {
                expect(value).to.match(/^P(?:(\d+Y)?(\d+M)?(\d+D)?)(?:T(\d+H)?(\d+M)?(\d+S)?)?$/);
            })
            break;
        case 'rfc3339-date-time':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid RFC3339 date-time in UTC format`, function () {
                expect(value).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/);
            });
            break;
    }
    return test
}

function complianceCheck({ value, compliance, testName, property }) {
    let test

    switch (compliance) {
        case 'rfc3339-date-time':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid RFC3339 date-time in UTC format`, function () {
                expect(value).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/);
            });
            break;
        case 'gst':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid GST format`, function () {
                expect(value).to.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);
            });
            break;
        case 'phone':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid phone number`, function () {
                expect(value).to.match(/^\d{10,11}$/);
            });
            break;
        case 'email':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid email address`, function () {
                expect(value).to.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            });
            break;
        case 'currency':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid ISO4217 currency format`, function () {
                expect(value).to.match(/^[A-Z]{3}$/);
            });
            break;
        case 'fssai':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid FSSAI number`, function () {
                expect(value).to.match(/^\d{14}$/);
            });
            break;
        case 'hsn':
            test = new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be a valid HSN code`, function () {
                expect(value).to.match(/^\d{4,8}$/);
            });
            break;
        case 'gps-coord':
            messageTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_type] ${testName}' should be valid GPS coordinates with at least six decimal places`, function () {
                const gpsPattern = /^-?\d{1,3}\.\d{6,}$/;
                expect(value).to.match(gpsPattern);
            }));
            break;
    }
    return test;
}


/**
 * Generate Mocha test suite for validating a given schema and message object.
 * @param {Object} message - The message object to validate.
 * @param {Object} schema - The schema to validate against.
 * @param {string} suiteName - Name of the test suite.
 * @returns {Mocha.Suite}  Generated test suite.
 */
function generateTests(message, schema, suiteName = "") {
    const suite = new Mocha.Suite(suiteName);

    // Function to recursively add tests based on schema properties
    function addTestsForProperties(properties, parentObject, parentPath = "") {
        Object.keys(properties).forEach((prop) => {
            const property = properties[prop];
            const fullPath = parentPath ? `${parentPath}.${prop}` : prop;
            const currentObject = parentObject ? parentObject[prop] : undefined;

            // Check if the property is required
            if (property.required && property.required.includes(prop)) {
                suite.addTest(
                    new Mocha.Test(`'[id: ${property?.id}_type] ${fullPath}' should be required`, function () {
                        expect(currentObject).to.exist;
                    })
                );
            }

            // Test property type
            if (property?.type) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_type] ${fullPath}' should be a ${property.type}`,
                        function () {
                            expect(currentObject).to.be.a(property.type);
                        }
                    )
                );
            }

            // Test minLength for strings
            if (property?.minLength) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_type] ${fullPath}' should have minLength ${property.minLength}`,
                        function () {
                            expect(currentObject).to.have.lengthOf.at.least(
                                property.minLength
                            );
                        }
                    )
                );
            }

            // Test enum values
            if (property?.enum) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_type] ${fullPath}' should be one of [${property.enum.join(", ")}]`,
                        function () {
                            expect(property.enum).to.include(currentObject);
                        }
                    )
                );
            }

            // Test constant values
            if (property?.const) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_type] ${fullPath}' should equal '${property.const}'`,
                        function () {
                            expect(currentObject).to.equal(property.const);
                        }
                    )
                );
            }

            // Test pattern for strings
            if (property?.pattern) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_type] ${fullPath}' should match pattern ${property.pattern}`,
                        function () {
                            expect(currentObject).to.match(new RegExp(property.pattern));
                        }
                    )
                );
            }

            // Test 'not' pattern for strings
            if (property?.not?.pattern) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_type] ${fullPath}' should not match pattern ${property.not.pattern}`,
                        function () {
                            expect(currentObject).to.not.match(
                                new RegExp(property.not.pattern)
                            );
                        }
                    )
                );
            }

            // Test for format validation
            if (property?.format) {
                const test = formatCheck({
                    value: currentObject,
                    format: property.format,
                    testName: fullPath,
                    property: property
                });
                if (test) {
                    suite.addTest(test);
                }
            }

            // Test for array minItems validation
            if (property?.minItems && Array.isArray(currentObject)) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_type] ${fullPath}' should have at least ${property.minItems} items`,
                        function () {
                            expect(currentObject).to.have.lengthOf.at.least(
                                property.minItems
                            );
                        }
                    )
                );
            }

            // Recursive test generation for nested objects
            if (property?.properties) {
                addTestsForProperties(property.properties, currentObject, fullPath);
            }

            // Recursive test generation for arrays
            if (property?.element && Array.isArray(currentObject)) {
                currentObject.forEach((element, index) => {
                    if (property?.element?.properties) {
                        addTestsForProperties(
                            property.element.properties,
                            element,
                            `${fullPath}[${index}]`
                        );
                    }
                });
            }
        });
    }

    // Start adding tests based on schema
    suite.addTest(
        new Mocha.Test("message should be a valid object", function () {
            expect(message).to.be.an("object").and.to.not.be.null;
        })
    );

    // Begin recursive test generation
    addTestsForProperties(schema.properties, message);

    return suite;
}



module.exports = { formatCheck, complianceCheck, generateTests }