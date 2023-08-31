/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    config.externals = [...config.externals, 'hnswlib-node'];
    return config
  }
}

module.exports = nextConfig
