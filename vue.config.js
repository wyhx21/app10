const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.VUE_APP_OUT_PUT_DIR,
  lintOnSave: true,
  configureWebpack: (config) => {
    if(process.env.VUE_APP_MODE === 'production') {
      config.mode = 'production'
    } else {
      config.mode = 'development'
      Object.assign(config, {
        devServer: {
          compress: true,
          port: 9000,
          open: false,
          proxy: {
            '/api': {
              target: 'http://localhost:8080'
            },
            '/font': {
              target: 'http://localhost:8080'
            },
          }
        }
      })
    }

    Object.assign(config, {
      resolve: {
        alias: {
          '@store': resolve('src/store'),
          '@router': resolve('src/router'),
          '@com': resolve('src/components'),
          '@style': resolve('src/style'),
          '@utils': resolve('src/utils'),
          '@axios': resolve('src/axios'),
          '@img': resolve('src/img')
        }
      }
    })
  },
  chainWebpack: config => {
    // config.resolve.alias
    //   .set('@store', resolve('src/store'))
    //   .set('@router', resolve('src/router'))
    //   .set('@com', resolve('src/components'))
    //   .set('@style', resolve('src/style'))
    //   .set('@utils', resolve('src/utils'))
    //   .set('@axios', resolve('src/axios'))
    //   .set('@img', resolve('src/img'))
  }
}