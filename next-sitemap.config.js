const config = {
    siteUrl: 'https://cui-connect.vercel.app',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    additionalPaths: async (config) => {
        console.log('Configuring additional paths...');
        return [
            {
                loc: `${config.siteUrl}/example-page`,
                changefreq: 'daily',
                priority: 0.7,
            },
        ];
    },
};

console.log('Sitemap configuration:', config);

module.exports = config;
