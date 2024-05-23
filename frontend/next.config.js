const path = require('path')
const nextConfig = {
  reactStrictMode: true,
	i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
	sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
	swcMinify: false
}

module.exports = nextConfig