/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // EMFILE（開くファイル数上限）対策: node_modules を監視対象外に
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '.next'],
      };
    }
    return config;
  },
};

module.exports = nextConfig;
