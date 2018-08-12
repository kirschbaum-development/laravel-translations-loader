let assert = require('assert')
let phpLoader = require('./../php-loader')

describe('it should load php language files', function () {
    it('should load regular php translation', function () {
        let content = phpLoader.execute('./test/fixtures/php', {});

        assert.deepEqual(content.en, {
            translation: {
                validation: {
                    required: 'this field is required',
                },
                another: 'translation',
            }
        });
    });
});
