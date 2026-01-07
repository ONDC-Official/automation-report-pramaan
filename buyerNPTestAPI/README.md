# > Schema-Based Testing:

## I. Context Test Generator Function

## Key Components

### **1. `validSchema`**

- Represents the schema used to validate the object.

### **2. `validSchema.properties`**

- Refers to the parent object/key that contains all the fields such as:
  - `"domain"`
  - `"action"`
  - Other related fields.

### **3. `prop`**

- The name of the key being tested.
- Used to access the corresponding value from the context object of the log being tested.

### **4. `property`**

- Represents the value of `prop`.
- It is itself an object that contains various fields used for validation, including:
  - **`type`**: Specifies the data type of the field.
  - **`minLength`**: Specifies the minimum length requirement.
  - **`format`**: Indicates the expected format of the field (e.g., email, URL).
  - **`pattern`**: Defines a regular expression the field must match.
  - **`errorMessage`**: Custom error message displayed when validation fails.

## II. Message Test Generator Function:

> `addTestsForProperties`

## Overview

The function `addTestsForProperties` is a **recursive function** designed to iterate over the schema and test the properties of an object in a structured manner. This function helps validate all the keys in the schema, creating tests for each field as required.

### **Arguments**

1. **`properties`**:
   - The parent schema object containing all the keys to be validated.
   - This object represents the entire structure of the schema that needs to be iterated over.
2. **`parentObject`**:
   - The actual data (parent object) being tested, which corresponds to the logs we are validating.
   - This object holds the data structure that is checked against the schema.
3. **`parentPath`**:
   - Represents the full path of the current property in the hierarchy of the object.
   - It helps to identify the location of the current property within the nested structure, which will be displayed in reports for clarity.

### **Internal Variables**

Within the recursive function, the following variables are used:

1. **`property`**:
   - Represents the value of the current `prop` (key) we are iterating over.
   - When mapping over the object’s keys, `prop` refers to the key, and `property` refers to the value associated with that key.
2. **`fullPath`**:

   - The full path of the current property or object being tested.
   - It is dynamically constructed as the function traverses deeper into the hierarchy, showing the exact location of the current field in the report.

3. **`currentObject`**:
   - The current element, object, string, number, or boolean that is being tested.
   - This is the actual data that will be validated based on the schema's requirements.

---

## Workflow

1. **Iterating Over Properties**:
   - The function recursively maps over the `properties` (parent schema object) and accesses the associated values (`property`).
2. **Testing Each Property**:

   - For each property, the function checks the data against the schema definitions.
   - As the recursion continues, `fullPath` and `currentObject` are updated to reflect the current level and element being tested.

3. **Generating Reports**:
   - The `parentPath` helps identify the exact location of the property within the data structure, making it easier to generate detailed and accurate reports.

---

## Example Flow

1. The function starts with the root `properties` and `parentObject`.
2. It then drills down into each property of the `properties` object, tracking the `fullPath` for each key.
3. For each level, it validates the `currentObject` (whether it is an object, string, number, or boolean), making sure it adheres to the rules defined in the schema.
4. The function continues recursively until all properties in the schema are validated and tested.
5. The final reports will display the `parentPath` alongside the validation results for each property.

---

This structure ensures that all fields in the schema are tested and reported on, with clear context on where each property resides in the data hierarchy.
