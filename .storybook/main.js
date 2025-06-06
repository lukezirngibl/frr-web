import webpack from 'webpack'

module.exports = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.story.mdx',
    '../stories/**/*.story.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', {
    name: '@storybook/addon-essentials',
    options: {
      docs: false,
    },
  }, '@storybook/addon-webpack5-compiler-babel'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@mui/styled-engine': '@mui/styled-engine-sc',
    // }
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer'),
    }
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    )

    return config
  },
  docs: {
    autodocs: false,
  },
}
