const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const phpLoader = require('./php-loader');
const loaderUtils = require('loader-utils');

module.exports = function (indexContent) {
    let options = {};
    let baseDirectory;
    let loaderPath = 'node_modules' + path.sep + '@kirschbaum-development' + path.sep + 'laravel-translations-loader' + path.sep + 'php.js';

    try {
        options = loaderUtils.getOptions(this);
    } catch (e) { }

    if (path.dirname(this.resource).includes(path.dirname(loaderPath))) {
        baseDirectory = path.dirname(this.resource) + path.sep + '..' + path.sep + '..' + path.sep + '..' + path.sep + 'resources' + path.sep + 'lang';
    } else {
        baseDirectory = path.dirname(this.resource);
    }

    this.addDependency(baseDirectory);

    return "module.exports = " + JSON.stringify(
        phpLoader.execute(baseDirectory, options, this)
    );
}
