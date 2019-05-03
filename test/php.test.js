let assert = require('assert')
let path = require('path')
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

    it('should load both languages', function () {
        let content = phpLoader.execute('./test/fixtures/php', {});

        assert.deepEqual(content.en, {
            translation: {
                validation: {
                    required: 'this field is required',
                },
                another: 'translation',
            }
        });

        assert.deepEqual(content.es, {
            translation: {
                validation: {
                    required: 'este campo es obrigatorio',
                },
                another: 'traducion',
            }
        });
    });

    it('should be able to replace parameters', function () {
        let content = phpLoader.execute('./test/fixtures/php-with-parameters', {
            parameters: '{{ $1 }}'
        });

        assert.deepEqual(content.en, {
            validation: {
                required: 'the field {{ input }} is required'
            }
        });
    });

    it('should be able to load nested folders', function () {
        let content = phpLoader.execute('./test/fixtures/php-with-nested-folders', {});

        assert.deepEqual(content.en, {
            validation: {
                required: 'This field is required',
            },
            "menu/main": {
                home: 'Home',
                about: 'About'
            }
        });
    });

    it('should be able to use namespace', function () {
        let namespace = 'test';
        let content = phpLoader.execute('./test/fixtures/php-with-namespace', {
            namespace: namespace,
        });

        assert.deepEqual(content.en[namespace], {
            validation: {
                required: 'This field is required',
            }
        });
    });

    it('should be able to use namespace and replace parameters', function () {
        let namespace = 'test';
        let content = phpLoader.execute('./test/fixtures/php-with-namespace-parameters', {
            namespace: namespace,
            parameters: '{{ $1 }}'
        });

        assert.deepEqual(content.en[namespace], {
            validation: {
                required: 'the field {{ input }} is required'
            }
        });
    });
});
