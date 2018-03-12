require('react-native-mock/mock')

/*
Note: this is blocked until react-native-mock fixes the outdated dependency
on the propTypes library (https://github.com/RealOrangeOne/react-native-mock/issues/139)

Once this is fixed, add this file as the setupTestFrameworkScriptFile in
package.json, as below:

"jest": {
  ...
  "setupTestFrameworkScriptFile": "./test/setup.js",
}
*/
