const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const phpLoader = require('./php-loader');
const loaderUtils = require('loader-utils');

module.exports = function (indexContent) {
    let options = {};

    try {
        options = loaderUtils.parseQuery(this.query);
    } catch (e) { }

    const baseDirectory = path.dirname(this.resource) + '/../../../resources/lang';

    return "module.exports = " + JSON.stringify(
        phpLoader.execute(baseDirectory, options)
    );
}
