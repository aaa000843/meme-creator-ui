/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  // !INITIAL_CONFIG Change the siteUrl
  /** Without additional '/' on the end, e.g. https://memezilla.com */
  siteUrl: 'https://memezilla.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};