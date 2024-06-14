// next.config.js
export default {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: 'empty'
        };
      }
      return config;
    },
  };
  
