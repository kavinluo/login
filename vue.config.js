const path = require("path");
const webpack = require("webpack");
// const glob = require("glob-all");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const PrerenderSpaPlugin = require("prerender-spa-plugin");
// const AliOssPlugin = require("webpack-oss");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
// const SpritesmithPlugin = require('webpack-spritesmith')
// let has_sprite = true

// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

// const addStylusResource = rule => {
//   rule
//     .use("style-resouce")
//     .loader("style-resources-loader")
//     .options({
//       patterns: [resolve("src/assets/stylus/variable.styl")]
//     });
// };

// try {
//   let result = fs.readFileSync(path.resolve(__dirname, './icons.json'), 'utf8')
//   result = JSON.parse(result)
//   const files = fs.readdirSync(path.resolve(__dirname, './src/assets/icons'))
//   has_sprite = files && files.length ? files.some(item => {
//     let filename = item.toLocaleLowerCase().replace(/_/g, '-')
//     return !result[filename]
//   }) : false
// } finally {
//   has_sprite = false
// }


module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  configureWebpack: config => {
    const plugins = [];

    if (IS_PROD) {
      // 去除多余css
      // plugins.push(
      //   new PurgecssPlugin({
      //     paths: glob.sync([resolve("./**/*.vue")]),
      //     extractors: [
      //       {
      //         extractor: class Extractor {
      //           static extract(content) {
      //             const validSection = content.replace(
      //               /<style([\s\S]*?)<\/style>+/gim,
      //               ""
      //             );
      //             return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
      //           }
      //         },
      //         extensions: ["html", "vue"]
      //       }
      //     ],
      //     whitelist: ["html", "body"],
      //     whitelistPatterns: [/el-.*/],
      //     whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
      //   })
      // );
     
    }
  

    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    config
      .plugin("ignore")
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      );



    config.plugin("html").tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      // html中添加cdn
      // args[0].cdn = cdn;
      return args;
    });

    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@components", resolve("src/components"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@layouts", resolve("src/layouts"))
      .set("@static", resolve("src/static"));

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }
    if (IS_PROD) {
      // config.optimization.delete("splitChunks");
    }
    return config;
  },
  transpileDependencies: [],
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
     open: true, // 是否打开浏览器
     host: "localhost",
     port: "9025", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/api": {
        target: 'http://192.168.1.182:9025', // // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        // pathRewrite: {
        //   "^/api": "/"
        // }
      }
    }
  }
};