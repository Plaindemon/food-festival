const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");



module.exports = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + "/dist",
        publicPath: ""
      },
      module: {
        rules: [
          {
            test: /\.jpg$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
                  name (file) {
                    return "[path][name].[ext]"
                  },
                  publicPath: function(url) {
                    return url.replace("../", "/assets/")
                  }
                }  
              },
              {
                loader: 'image-webpack-loader'
              }
            ]
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
          new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
          }),
          //  invoking a constructor function
          new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            // specify the homepage for the PWA relative to the location of the manifest file
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            //  tell webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated -- false stops this from happening
            fingerprints: false,
            // determines whether the link to the manifest.json is added to the HTML -- false stops this from happening
            inject: false,
            // value of which will be an array of objects
            icons: [{
              // path to the icon image we want to use
              src: path.resolve("assets/img/icons/icon-512x512.png"),
              // plugin will take the src image, and create icons with the dimensions of the numbers provided as the value
              sizes: [96, 128, 192, 256, 384, 512],
              // designates where the icons will be sent after the creation of the web manifest is completed by the plugin
              destination: path.join("assets", "icons")
            }]
          })
      ],
      devServer: {
        static: {
          directory: path.join(__dirname, ""),
        },
      },
      mode: 'development'  
}