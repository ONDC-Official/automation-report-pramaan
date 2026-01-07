const Mocha = require("mocha");
const { expect } = require("chai");
const { contextBussinessTests } = require("../bussinessTests/commonBussiness");

function processComparison(operation, dataOne, dataTwo, testSuite) {
    try {
        const { valOne, textOne } = dataOne;
        const { valTwo, textTwo } = dataTwo;

        testSuite.addTest(new Mocha.Test(`should verify ${valOne} (${textOne}) ${operation} ${valTwo} (${textTwo}) `, function () {
            switch (operation) {
                case "===":
                    expect(valOne).to.equal(valTwo);
                    break;
                case "<=":
                    expect(valOne).to.be.at.most(valTwo);
                    break;
                case ">=":
                    expect(valOne).to.be.at.least(valTwo);
                    break;
                case "<":
                    expect(valOne).to.be.below(valTwo);
                    break;
                case ">":
                    expect(valOne).to.be.above(valTwo);
                    break;
                default:
                    throw new Error(`Unsupported operation: ${operation}`);
            }
        }));
    } catch (err) {
        console.log(err);
    }
}


function formatCheck({ value, format, testName, property }) {
    let test

    // checking if the property is optional
    const OPTIONAL = property?.optional ? " (OPTIONAL)" : "";

    switch (format) {
        case 'url':
            test = new Mocha.Test(`'[id: ${property?.id}_type]' ${testName} should be a valid URL${OPTIONAL}`, function () {
                expect(value).to.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i);
            });
            break;
        case 'duration':
            test = new Mocha.Test(`'[id: ${property?.id}_type]' ${testName} should be a valid RFC3339 duration${OPTIONAL}`, function () {
                expect(value).to.match(/^P(?:(\d+Y)?(\d+M)?(\d+D)?)(?:T(\d+H)?(\d+M)?(\d+S)?)?$/);
            })
            break;
        case 'rfc3339-date-time':
            test = new Mocha.Test(`'[id: ${property?.id}_type]' ${testName} should be a valid RFC3339 date-time in UTC format${OPTIONAL}`, function () {
                expect(value).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/);
            });
            break;
    }
    return test
}

function complianceCheck({ value, compliance, testName, property }) {
    let test

    // checking if the property is optional
    const OPTIONAL = property?.optional ? " (OPTIONAL)" : "";

    switch (compliance) {
        case 'rfc3339-date-time':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be a valid RFC3339 date-time in UTC format${OPTIONAL}`, function () {
                expect(value).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/);
            });
            break;
        case 'gst':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be a valid GST format${OPTIONAL}`, function () {
                expect(value).to.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);
            });
            break;
        case "price":
            test = new Mocha.Test(`'[id: ${property?.id}_type]' ${testName} should be valid price value with upto two decimal places${OPTIONAL}`, function () {
                const pricePattern = /^\d+(\.\d{1,2})?$/;
                expect(value).to.match(pricePattern);
            });
            break;
        case 'phone':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be a valid phone number${OPTIONAL}`, function () {
                expect(value).to.match(/^\d{10,11}$/);
            });
            break;
        case 'email':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be a valid email address${OPTIONAL}`, function () {
                expect(value).to.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            });
            break;
        case 'currency':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be a valid ISO4217 currency format${OPTIONAL}`, function () {
                expect(value).to.match(/^[A-Z]{3}$/);
            });
            break;
        case 'city':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be a valid city format${OPTIONAL}`, function () {
                expect(value).to.match(/^[A-Z]{3}$/);
            });
            break;
        case 'fssai':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be a valid FSSAI number${OPTIONAL}`, function () {
                expect(value).to.match(/^\d{14}$/);
            });
            break;
        case 'hsn':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be a valid HSN code${OPTIONAL}`, function () {
                expect(value).to.match(/^\d{4,8}$/);
            });
            break;
        case 'gps-coord':
            test = new Mocha.Test(`'[id: ${property?.id}_compliance]' ${testName} should be valid GPS coordinates with at least six decimal places${OPTIONAL}`, function () {
                const gpsPattern = /^-?\d{1,3}\.\d{6,},-?\d{1,3}\.\d{6,}$/;
                expect(value).to.match(gpsPattern);
            });
            break;
    }
    return test;
}

function getPropertyByIfThenClause({ structure, data, params }) {
    // Recursively find the matching then clause
    function recursiveFind(structure, data) {
        if (!Array.isArray(structure)) return null;

        for (let item of structure) {
            if (item.if && matches(item.if.properties, data, params)) {
                if (item.then) {
                    return item.then
                }
            }
        }

        return null;
    }

    // Check if the data matches the properties
    function matches(properties, data, params) {
        for (let key in properties) {
            if (typeof properties[key] === "object" && !properties[key]?.const && !Array.isArray(properties[key])) {
                // Recursively check nested properties
                if (matches(properties[key], data?.[key], params?.[key])) {
                    return true;
                }
            } else if (
                properties.type === "params" &&
                properties[key]?.const &&
                (params?.[key] === properties[key].const || properties[key].const.includes(params?.[key]))
            ) {
                return true;
            } else if (
                properties.type !== "params" &&
                properties[key]?.const &&
                (data?.[key] === properties[key].const || properties[key].const.includes(data?.[key]))
            ) {
                return true;
            }
        }
        return false;
    }


    return recursiveFind(structure, data);
}


/**
 * Generate Mocha test suite for validating a given schema and context object.
 * @param {Object} context - The object to validate.
 * @param {Object} constants
 * @param {Array} logs
 * @param {Object} schema - The schema to validate against.
 * @returns {Mocha.Suite}  Generated test suite.
 */
function contextTests(context = {}, constants = {}, logs = [], schema) {
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

        validSchema.required.forEach((prop, index) => {
            contextTestSuite.addTest(new Mocha.Test(`[id: retail_bpp_context_${15 + index}] 'context' should have required property '${prop}'`, function () {
                expect(context).to.have.property(prop);
            }))
        })

        Object.keys(validSchema.properties).forEach(prop => {
            const property = validSchema?.properties[prop];

            if (constants?.excludeProps && constants?.excludeProps.includes(`context.${prop}`))
                return;

            if (property?.type) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_type]' 'context.${prop}' should be a ${property.type}${prop === "transaction_id" ? " (" + context[prop] + ")" : ""}`, function () {
                    expect(context[prop]).to.be.a(property.type);
                }));
            }

            if (property?.minLength) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_minLength]' 'context.${prop}' should have minLength ${property.minLength}`, function () {
                    expect(context[prop]).to.have.lengthOf.at.least(property.minLength);
                }));
            }

            if (property?.maxLength) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_maxLength]' 'context.${prop}' should have length less than or equal to ${property.maxLength}`, function () {
                    expect(context[prop]).to.have.lengthOf.at.most(property.maxLength);
                }));
            }

            if (property?.enum) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_enum]' 'context.${prop}' should be one of [${property.enum.join(', ')}]`, function () {
                    expect(property.enum).to.include(context[prop]);
                }));
            }

            if (property?.const) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_const]' 'context.${prop}' should be '${constants[property.const]}'`, function () {
                    expect(context[prop]).to.equal(constants[property.const]);
                }));
            }

            if (property?.pattern) {
                const testDescription = property?.errorMessage ?? `'[id: ${property?.id}_pattern]' 'context.${prop}' should match pattern ${property.pattern}`;
                contextTestSuite.addTest(new Mocha.Test(testDescription, function () {
                    expect(context[prop]).to.match(new RegExp(property.pattern));
                }));
            }

            if (property?.not && property?.not?.pattern) {
                contextTestSuite.addTest(new Mocha.Test(`'[id: ${property?.id}_nonPattern]' 'context.${prop}' should not match pattern ${property.not.pattern}`, function () {
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

        contextBussinessTests(contextTestSuite, context, logs, constants);

        return contextTestSuite;
    } catch (err) {
        console.log(err);
    }
}


/**
 * Generate Mocha test suite for validating a given schema and message object.
 * @param {Object} data - The object to validate.
 * @param {Object} schema - The schema to validate against.
 * @param {string} suiteName - Name of the test suite.
 * @returns {Mocha.Suite}  Generated test suite.
 */
function generateTests({ context, message = {}, errors = [] }, schema, suiteName = "", constants = {}) {
    const suite = new Mocha.Suite(suiteName);

    // Function to recursively add tests based on schema properties
    function addTestsForProperties(properties, parentObject, parentPath = "") {
        if (!properties)
            return;

        Object.keys(properties).forEach((prop) => {
            const property = properties[prop];
            const fullPath = parentPath ? `${parentPath}${prop === "_" ? "" : "." + prop}` : prop;
            const currentObject = parentObject ? prop === "_" ? parentObject : parentObject[prop] : undefined;

            // checking if the property is optional
            const OPTIONAL = property?.optional ? " (OPTIONAL)" : "";

            // Test property type
            if (property?.type) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_type]' ${fullPath} should be a ${property.type}${OPTIONAL}`,
                        function () {
                            expect(currentObject).to.be.a(property.type);
                        }
                    )
                );
            }

            // passing a key in parent to params for conditions in children
            if (property?.passKeysToParams) {
                property?.passKeysToParams?.forEach((key) => {
                    constants = {
                        ...constants,
                        [key]: currentObject[key]
                    }
                })
            }

            // Test minLength for strings
            if (property?.minLength) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_minLength]' ${fullPath} should have minLength ${property.minLength}${OPTIONAL}`,
                        function () {
                            expect(currentObject).to.have.lengthOf.at.least(
                                property.minLength
                            );
                        }
                    )
                );
            }

            if (property?.maxLength) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_maxLength]' ${fullPath} should have length less than or equal to ${property.maxLength}${OPTIONAL}`,
                        function () {
                            expect(currentObject).to.have.lengthOf.at.most(
                                property.maxLength
                            );
                        }
                    )
                );
            }

            // Test enum values
            if (property?.enum) {
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_enum]' ${fullPath} should be one of [${property.enum.join(", ")}]${OPTIONAL}`,
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
                        `'[id: ${property?.id}_const]' ${fullPath} should equal '${constants[property.const]}${OPTIONAL}'`,
                        function () {
                            expect(currentObject).to.equal(constants[property.const]);
                        }
                    )
                );
            }

            // Test pattern for strings
            if (property?.pattern) {
                const testDescription = property?.errorMessage ?? `should match pattern ${property.pattern}`;
                suite.addTest(
                    new Mocha.Test(
                        `'[id: ${property?.id}_pattern]' ${fullPath} ${testDescription}${OPTIONAL}`,
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
                        `'[id: ${property?.id}_notPattern]' ${fullPath} should not match pattern ${property.not.pattern}${OPTIONAL}`,
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

            // Test for compliance validation
            if (property?.compliance) {
                const test = complianceCheck({
                    value: currentObject,
                    compliance: property.compliance,
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
                        `'[id: ${property?.id}_minItems]' ${fullPath} should have at least ${property.minItems} items`,
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
                // checking if the object contains all the required properties
                if (Array.isArray(property?.required)) {
                    property.required.forEach(prop => {
                        suite.addTest(new Mocha.Test(`'[id: ${property?.id}_required]' ${fullPath} should have required property '${prop}'`, function () {
                            expect(currentObject).to.have.property(prop);
                        }))
                    })
                }

                // if object has condition on its keys
                if (property?.required?.type === "array") {
                    const requiredProperties = (
                        getPropertyByIfThenClause({
                            structure: property?.required?.element?.allOf,
                            data: currentObject,
                            params: constants
                        }) || (Array.isArray(property?.required) ? property?.required : [])
                    );

                    let propertiesToBeTested = {};
                    requiredProperties?.forEach((key) => {
                        propertiesToBeTested[key] = property?.properties[key]
                    });

                    addTestsForProperties(
                        propertiesToBeTested,
                        currentObject,
                        fullPath
                    );

                    // if there is no condition
                } else {
                    addTestsForProperties(property.properties, currentObject, fullPath);
                }
            }

            // test generation for arrays like images: [ "http://images.com" ]
            if (property && Array.isArray(currentObject) && !property?.element?.properties && !property?.element?.allOf) {
                currentObject.forEach((element, index) => {
                    addTestsForProperties(
                        { _: property.element },
                        element,
                        `${fullPath}[${index}]`
                    );
                });
            }

            // test generation for arrays which contains objects which can have values depending on some enums like lists and tags
            if (Array.isArray(currentObject) && property?.element?.allOf) {
                currentObject.forEach((element, index) => {
                    const requiredProperties = (
                        getPropertyByIfThenClause({
                            structure: property?.element?.allOf,
                            data: element,
                            params: constants
                        }) || (Array.isArray(property?.element?.required) ? property?.element?.required : [])
                    );

                    addTestsForProperties(
                        requiredProperties?.properties,
                        element,
                        `${fullPath}[${index}]`
                    );
                });
            }

            // test generation for arrays like payments: [{ "status": "NOT-PAID" }] i.e. without conditions
            if (Array.isArray(currentObject) && !property?.element?.required && property?.element?.properties) {
                currentObject.forEach((element, index) => {
                    addTestsForProperties(
                        property?.element?.properties,
                        element,
                        `${fullPath}[${index}]`
                    );
                });
            }

            // if the currentObject is an array and has required property i.e. it has conditions
            if (Array.isArray(currentObject) && property?.element?.required && property?.element?.properties) {
                currentObject.forEach((element, index) => {
                    const requiredProperties = (
                        getPropertyByIfThenClause({
                            structure: property?.element?.required?.element?.allOf,
                            data: element,
                            params: constants
                        }) || (Array.isArray(property?.element?.required) ? property?.element?.required : [])
                    );

                    let propertiesToBeTested = {};
                    requiredProperties?.forEach((key) => {
                        propertiesToBeTested[key] = property?.element?.properties[key]
                    });

                    addTestsForProperties(
                        propertiesToBeTested,
                        element,
                        `${fullPath}[${index}]`
                    );
                })
            }
        });
    }

    // Start adding tests based on schema
    if (message) {
        suite.addTest(
            new Mocha.Test("message should be a valid object", function () {
                expect(message).to.be.an("object").and.to.not.be.null;
            })
        );

        // Begin recursive test generation
        addTestsForProperties(schema.properties, message, "message");
    }

    if (errors.length > 0) {
        suite.addTest(
            new Mocha.Test("errors should be an array that is not empty", function () {
                expect(errors).to.be.an("array").that.is.not.empty;
            })
        );

        // Begin recursive test generation
        addTestsForProperties(schema.properties, errors, "errors");
    }

    return suite;
}


module.exports = {
    generateTests,
    contextTests
}