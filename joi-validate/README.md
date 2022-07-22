# https://www.bacancytechnology.com/blog/joi-validation-in-nodejs-and-express

- 1. Joi.string(): It validates that all properties are string
- 2. Joi.alphanum(): It must contain only alphanumeric characters.
- 3. Joi.min(): It specifies the minimum number.
- 4. Joi.max(): It specifies the maximum number.
- 5. Joi.trim(): Requires the string value to contain no whitespace before or after.
- 6. Joi.required(): Make a property required which will not allow undefined as value.
- 7. Joi.email(): It validates that the email property contains a valid email address.
- 8. Joi.length(): It specifies the exact number of character or number of items in the array.
- 9. Joi.pattern(): A pattern will be a regular expression. It specifies validation rules for matching a pattern.
- 10. Joi.integer(): Requires the number to be an integer (no floating point).
- 11. Joi.array(): Generates a schema object that matches an array data type.
- 12. Joi.items(): Lists the types allowed for the array values were types – one or more joi schema objects to validate each array item against.
- 13. Joi.default(): creates a default value for property.
- 14. Joi.boolean(): Generates a schema object that matches a boolean data type (as well as the strings ‘true’, ‘false’, ‘yes’, and ‘no’).