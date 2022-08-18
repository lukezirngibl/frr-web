const custom = require('./webpack.config.js')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.story.mdx',
    '../stories/**/*.story.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // webpackFinal: async (config) => {
    
  //   console.log('CONFIG', JSON.stringify(config.module, null, 2))

  //   return custom({ config })
  // },
}

