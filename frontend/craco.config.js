// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // set Webpack fallback 
        webpackConfig.resolve.fallback = {
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "util": require.resolve("util/"),
          "zlib": require.resolve("browserify-zlib"),
          "stream": require.resolve("stream-browserify"),
          "assert": require.resolve("assert/"),
          "url": require.resolve("url/")
        };
        return webpackConfig;
      }
    }
  };
  