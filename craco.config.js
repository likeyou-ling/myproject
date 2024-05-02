// get current path
const path = require('path');

// modify webpack config
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}