const _ = require('lodash');
const path = require('path');
const phpLoader = require('./php-loader');
const jsonLoader = require('./json-loader');
const loaderUtils = require('loader-utils');

module.exports = function (indexContent) {
    let options = {};
    let baseDirectory;
    let loaderPath = 'node_modules' + path.sep + '@kirschbaum-development' + path.sep + 'laravel-translations-loader' + path.sep + 'all.js';

    try {
        options = loaderUtils.parseQuery(this.query);
    } catch (e) { }

    if (path.dirname(this.resource).includes(path.dirname(loaderPath))) {
        baseDirectory = path.dirname(this.resource) + path.sep + '..' + path.sep + '..' + path.sep + '..' + path.sep + 'resources' + path.sep + 'lang';
    } else {
        baseDirectory = path.dirname(this.resource);
    }

    this.addDependency(baseDirectory);

    const jsonContents = jsonLoader.execute(baseDirectory, options, this);
    const phpContents = phpLoader.execute(baseDirectory, options, this);
    const bundle = _.merge(phpContents, jsonContents);

    return "module.exports = " + JSON.stringify(bundle);
}
