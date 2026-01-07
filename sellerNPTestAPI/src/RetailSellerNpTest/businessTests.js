const Mocha = require("mocha");
const { expect } = require("chai");

const checkVariant = ({ categories, item }) => {
    const checkVariantsTestSuite = new Mocha.Suite(`Variants Validations id: ${item?.id}`)

    const parent_item_id = item?.parent_item_id
    if (!parent_item_id) { return checkVariantsTestSuite; }

    const matchingCategories = categories?.filter(c => c.id === parent_item_id);

    const variantCategory = matchingCategories?.find(category =>
        category.tags.some(tag =>
            tag.code === "type" &&
            tag.list.some(listItem => listItem.code === "type" && listItem.value === "variant_group")
        )
    );

    checkVariantsTestSuite.addTest(
        new Mocha.Test(`parent_item_id should be a valid, non-empty string`, function () {
            expect(parent_item_id).to.be.a('string').that.is.not.empty;
        })
    )

    checkVariantsTestSuite.addTest(
        new Mocha.Test(`At least one category element matching the parent_item_id for the item should exist`, function () {
            expect(matchingCategories).to.be.an('array').that.is.not.empty;
        })
    )

    checkVariantsTestSuite.addTest(
        new Mocha.Test(`Category with same id as parent_item_id should have tags.code as type and tags.list with at least one element having code type and value variant_group`, function () {
            expect(variantCategory).to.not.be.undefined;
        })
    )

    return checkVariantsTestSuite
}


const checkCustomization = ({ categories, item }) => {
    const checkCustomizationTestSuite = new Mocha.Suite(`Customization validation id: ${item?.id}`);

    const itemTypeTag = item.tags.find(
        tag => tag.code === 'type' && tag.list.some(item => item.code === 'type' && item.value === 'customization')
    );

    if (!itemTypeTag) { return checkCustomizationTestSuite; }

    const parentTag = itemTypeTag ? item?.tags?.find(tag => tag.code === 'parent') : undefined;

    const categoryId = parentTag ? parentTag?.list?.find(item => item.code === 'id')?.value : undefined;

    const category = categoryId ? categories?.find(category => category.id === categoryId) : undefined;

    const configTag = category ? category?.tags?.find(tag => tag.code === 'config') : undefined;

    const minSelection = configTag ? configTag?.list?.find(item => item.code === 'min')?.value : undefined;

    const defaultTag = parentTag ? parentTag?.list?.find(item => item.code === 'default') : undefined;

    checkCustomizationTestSuite.addTest(
        new Mocha.Test(`itemTypeTag should be defined if item has a tag with code 'type' and 'customization' in its list`, function () {
            expect(itemTypeTag).to.not.be.undefined;
        })
    );

    checkCustomizationTestSuite.addTest(
        new Mocha.Test(`tag.code value as parent should be defined if item has customization`, function () {
            if (itemTypeTag) {
                expect(parentTag).to.not.be.undefined;
            }
        })
    );

    checkCustomizationTestSuite.addTest(
        new Mocha.Test(`Parent tag list should have code as id for the category`, function () {
            if (parentTag) {
                expect(categoryId).to.not.be.undefined;
            }
        })
    );

    checkCustomizationTestSuite.addTest(
        new Mocha.Test(`Category with same id as parent id value should be defined in bpp/providers.categories (OPTIONAL)`, function () {
            if (categoryId) {
                expect(category).to.not.be.undefined;
            }
        })
    );

    checkCustomizationTestSuite.addTest(
        new Mocha.Test(`category with same id as parent id value should have tags with tag.code as config defined`, function () {
            if (category) {
                expect(configTag).to.not.be.undefined;
            }
        })
    );

    checkCustomizationTestSuite.addTest(
        new Mocha.Test(`tag with code as config should have list with 'min' defined`, function () {
            if (configTag) {
                expect(minSelection).to.not.be.undefined;
            }
        })
    );

    checkCustomizationTestSuite.addTest(
        new Mocha.Test(`tag with code as config should have list with 'default' defined`, function () {
            if (parentTag) {
                expect(defaultTag).to.not.be.undefined;
            }
        })
    );

    checkCustomizationTestSuite.addTest(
        new Mocha.Test(`min value should be a string and default value should be one of ['yes', 'no'] if they exist`, function () {
            if (minSelection !== undefined && defaultTag?.value !== undefined) {
                expect(minSelection).to.be.a("string");
                expect(defaultTag.value).to.oneOf(['yes', 'no']);
            }
        })
    );
    return checkCustomizationTestSuite
}


module.exports = {
    checkVariant,
    checkCustomization
}