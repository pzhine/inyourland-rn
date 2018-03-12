import rules from './webpack/rules'
import extensions from './webpack/extensions'

module.exports = ({ platform }, { module, resolve }) => ({
  entry: `./src/client/index.${platform}.storybook.js`,
  module: {
    ...module,
    rules: [...rules, ...module.rules],
  },
})
