/* global process:true */

var angularity = require('webpack-angularity-solution');

const PORT    = 5000,
    GLOBALS = {
        $              : 'jquery',
        jQuery         : 'jquery',
        'window.jQuery': 'jquery'
    };

module.exports = angularity({globals: GLOBALS, port: PORT}, process.env)
    .include(process.env.MODE) // app|test|release
    .otherwise('app,test')     // run app+test if MODE is unspecified
    .resolve();