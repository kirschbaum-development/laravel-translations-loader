const _ = require('lodash');
const phpLoader = require('./php-loader');
const jsonLoader = require('./json-loader');
const loaderUtils = require('loader-utils');

module.exports = function (indexContent) {
    const baseDirectory = path.dirname(this.resource) + '/../../../resources/lang';
    const options = loaderUtils.parseQuery(this.query);
    const jsonContents = jsonLoader.execute(baseDirectory, options);
    const phpContents = phpLoader.execute(baseDirectory, options);
    const bundle = _.merge(phpContents, jsonContents);

    return "module.exports = " + JSON.stringify(bundle);
}
