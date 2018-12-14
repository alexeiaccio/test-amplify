const path = require('path')

exports.onCreateWebpackConfig = ({
  stage, getConfig, rules, loaders, actions
 }) => {
   actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: [
            path.resolve(__dirname, 'node_modules'),
          ],
          type: 'javascript/auto',
        }
      ],
    },
   })
 }