// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://cui-connect.vercel.app',
    generateRobotsTxt: true, // (optional) Generate robots.txt file
    changefreq: 'daily',
    priority: 0.7,
    // Additional settings if needed
};

module.exports = config;
