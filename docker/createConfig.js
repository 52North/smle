fs = require('fs');

var config = {};

function addToConfig(key, value) {
    config[key] = value;
};

addToConfig('sosUrl', process.env.SOS_URL);
addToConfig('proxyUrl', process.env.PROXY_URL);
addToConfig('authUrl', process.env.AUTH_URL);
addToConfig('logOutUrl', process.env.LOGOUT_URL);
addToConfig('userInfoUrl', process.env.USER_INFO_URL);
addToConfig('templatesUrl', process.env.TEMPLATES_URL);
addToConfig('oauthCallbackUrl', process.env.OAUTH_CALLBACK_URL);

fs.writeFile('/usr/share/nginx/html/config.json', JSON.stringify(config));
