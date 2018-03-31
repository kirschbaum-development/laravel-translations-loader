const _ = require('lodash');
const phpLoader = require('./php-loader');
const jsonLoader = require('./json-loader');
const loaderUtils = require('loader-utils');

module.exports = function (indexContent) {
    let options = {};

    try {
        options = loaderUtils.parseQuery(this.query);
    } catch (e) { }

    const baseDirectory = path.dirname(this.resource) + '/../../../resources/lang';
    const jsonContents = jsonLoader.execute(baseDirectory, options);
    const phpContents = phpLoader.execute(baseDirectory, options);
    const bundle = _.merge(phpContents, jsonContents);

    return "module.exports = " + JSON.stringify(bundle);
}
