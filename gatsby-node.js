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
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src'),
      ],
      extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json"],
    },
   })
 }