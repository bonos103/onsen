const fs = require('fs')
const path = require('path')

function resolve(p) {
  return path.join(__dirname, p)
}

export default {
  // mode: 'spa',
  server: {
    https: {
      key: fs.readFileSync(path.join(__dirname, '../cert/localhost+2-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../cert/localhost+2.pem')),
    },
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/stylesheets/reset.css',
    '~/assets/stylesheets/global.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/eventListener.client.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-svg-loader',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-color-function': {
          preserveCustomProps: true,
        },
      },
      preset: {
        stage: 1,
        features: {
          'custom-media-queries': {
            importFrom: [
              resolve('assets/stylesheets/media.css'),
            ],
          },
          'custom-properties': {
            preserve: false,
            importFrom: [
              resolve('assets/stylesheets/variables.css'),
            ],
          },
        },
      },
      order: ['postcss-preset-env', 'postcss-color-function', 'cssnano']
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.csv$/,
        use: [
          {
            loader: 'csv-loader',
            options: {
              dynamicTyping: true,
              header: true,
              skipEmptyLines: true,
            },
          },
        ],
      })
      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader',
      })
      config.module.rules.unshift({
        test: /\.worker\.js$/,
        use: 'worker-loader',
      })
    }
  }
}
