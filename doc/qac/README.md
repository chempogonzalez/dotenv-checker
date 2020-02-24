# 🔰 JavaScript Documentation Standards
JSDoc is a markup language used to annotate JavaScript source code files. Using comments containing JSDoc, programmers can add documentation describing the application programming interface of the code they're creating.

More info: [JSDoc](https://jsdoc.app/)

### SINGLE LINE COMMENTS
```js
// Extract the array values.
```

### MULTI-LINE COMMENTS
```js
/**
 * This is a comment that is long enough to warrant being stretched over
 * the span of multiple lines. You'll notice this follows basically
 * the same format as the JSDoc wrapping and comment block style.
 */
```

### FUNCTIONS
```js
/**
* @function getIntentClass
*
* @description Return an intent class from its name.
*
* @param {string} intentName - The name located in the attribute 'name' in the loaded json in the variable intentsJson.
*
* @returns {Promise<any>}
*
*/
```
