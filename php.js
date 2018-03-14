const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const loaderUtils = require('loader-utils');
const phpArrayParser = require('php-array-parser');
const phpLoader = require('./php-loader');

module.exports = function (indexContent) {
    const baseDirectory = path.dirname(this.resource) + '/../../../resources/lang';

    return "module.exports = " + JSON.stringify(phpLoader.execute(baseDirectory));
}
