const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/**/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => { 
    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './',
            }
          }
        }
      ],
      include: path.resolve(__dirname, '../'),
    })
    
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{
        loader: require.resolve('ts-loader'),
      }]
    })

    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules = config.module.rules.map(rule => {
      if (String(rule.test).includes('svg')) {        
        return {
          ...rule,
          test: new RegExp(
            String(rule.test)
              .substring(1, String(rule.test).length - 1)
              .replace('svg|', '')
            ),
        }
      }

      return rule
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    })
    
    return config
  }
}