![](https://raw.githubusercontent.com/kirschbaum-development/laravel-translations-loader/master/banner.jpg)

![Laravel Supported Versions](https://img.shields.io/badge/laravel-5.x/6.x/7.x/8.x-green.svg)
[![npm](https://img.shields.io/npm/v/@kirschbaum-development/laravel-translations-loader.svg)](https://www.npmjs.com/package/@kirschbaum-development/laravel-translations-loader)
[![npm](https://img.shields.io/npm/dt/@kirschbaum-development/laravel-translations-loader.svg)](https://www.npmjs.com/package/@kirschbaum-development/laravel-translations-loader)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://www.npmjs.com/package/@kirschbaum-development/laravel-translations-loader)
[![Actions Status](https://github.com/kirschbaum-development/laravel-translations-loader/workflows/CI/badge.svg)](https://github.com/kirschbaum-development/laravel-translations-loader/actions)

This package is a webpack loader to import your laravel translation files (PHP or JSON) into your JS bundle as JSON so you can use packages like [i18next](https://www.i18next.com/).

### Requirements

This package works with any version of laravel, as long as you are using [Laravel Mix](https://laravel.com/docs/5.6/mix) or any custom [webpack](https://webpack.js.org/) configuration, since this package is essentially a webpack loader.

### Installation

```bash
$ yarn add @kirschbaum-development/laravel-translations-loader --dev
```

or

```bash
$ npm install @kirschbaum-development/laravel-translations-loader --save-dev
```

### Usage

If you prefer, we have a [demo project](https://github.com/kirschbaum-development/laravel-translations-loader-demo) showing how to use it on laravel.

In your `app.js` file, just add the following import.

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader!@kirschbaum-development/laravel-translations-loader';
```

This will load and parse all your language files, including PHP and JSON translations. The `languageBundle` will look something like this:

```json
{
    "en": {
        "auth": {
            "failed": "These credentials do not match our records."
        }
    },
    "es": {
        "auth": {
            "failed": "Estas credenciales no coinciden con nuestros registros."
        }
    }
}
```

And so on, with all your languages and all your translation strings.

#### Namespacing

Some packages like [i18next](https://www.i18next.com) require a "namespace" before your actual translations. When this happens, you can import your files like this:

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader?namespace=translation!@kirschbaum-development/laravel-translations-loader';
```

And your translations will be loaded with the specified namespace in front of the translations:

```json
{
    "en": {
        "translation": {
            "auth": {
                "failed": "These credentials do not match our records."
            }
        }
    },
    "es": {
        "translation": {
            "auth": {
                "failed": "Estas credenciales no coinciden con nuestros registros."
            }
        }
    }
}
```

#### Load only JSON translations

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/json!@kirschbaum-development/laravel-translations-loader';
```

#### Load only PHP translation files

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/php!@kirschbaum-development/laravel-translations-loader';
```

#### Replacing Laravel Parameters

Sometines your javascript library may need to use a parameter syntax different than the one Laravel ships (e.g. `:input`). For that, you can just pass an additional parameter when importing the bundle. Let's say you want to change from `:input` to `{{ input }}`. You just need to add the `parameters` option:

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/php?parameters={{ $1 }}!@kirschbaum-development/laravel-translations-loader';
```

And that's it. Your parameters will be replaced by your new syntax. **Important:** Don't forget to use the `$1` or the parameter name will not be populated.

#### Using a different folder

If you are developing a package or for some reason have a different location for your translations, you can configure that by creating a `.js` file on your translations folder. For example, let's say you want to load translations on the language vendor folder.

First thing you need is to create a `index.js` file (empty, no content needed) on the `resources/lang/vendor/{package-name}`.

Then, you just need to reference this file when importing the translations:

```js
'@kirschbaum-development/laravel-translations-loader/php!resources/lang/vendor/{package-name}';
```

This will make the package loads your translations from `resources/lang/vendor/{package-name}` instead of `resources/lang`.

### Configuring in webpack.config.js

You can also apply the same configurations showed above directly on `webpack.config.js` to make this more readable. For that, follow these steps:

1. Create an empty `index.js` file on the `resources/lang/index.js` path.

2. Include the following rules in your config file:

```js
rules: [
    {
        test: path.resolve(__dirname, 'resources/lang/index.js'), // path to your index.js file
        loader: '@kirschbaum-development/laravel-translations-loader/php?parameters={$1}'
    }
]
```

Then, you just need to import the recently created `index.js` file on your `app.js` (or whatever other) file:

```js
import languageBundle from 'resources/lang/index.js';
```

For Laravel Mix, just apply the same configuration in the following way:

**Laravel Mix 3:**

```js
mix.webpackConfig({
    rules: [
        {
            test: path.resolve(__dirname, 'resources/lang/index.js'), // path to your index.js file
            loader: '@kirschbaum-development/laravel-translations-loader/php?parameters={$1}'
        }
    ]
});
```

**Laravel Mix 4:**

```js
mix.extend('translations', new class {
    webpackRules() {
        return {
            test: path.resolve(__dirname, '../resources/lang/index.js'),
            loader: '@kirschbaum-development/laravel-translations-loader/php?parameters={$1}'
        }
    }
});

mix.translations();
```

**Laravel Mix 6:**

```js
mix.extend('translations', new class {
    webpackRules() {
        return {
            test: path.resolve(__dirname, './resources/lang/index.js'),
            loader: '@kirschbaum-development/laravel-translations-loader/php',
            options: {
                parameters: "$1",
                includeOnly: ['auth', 'validation'],
                exclude: [],
            }
        }
    }
});

mix.translations();
```

***

### Useful packages to use with laravel-translations-loader

* [i18next](https://www.i18next.com/)
* [vue-i18next](https://github.com/panter/vue-i18next)
* [vue-i18n](https://github.com/kazupon/vue-i18n)
* [react-i18next](https://github.com/i18next/react-i18next)

***

### Example using [vue-i18n](https://github.com/kazupon/vue-i18n)

Notice you can directly pass the `languageBundle` object as a parameter into the `VueI18n` constructor.

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader?parameters={$1}!@kirschbaum-development/laravel-translations-loader';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: window.Locale,
    messages: languageBundle,
})
```

### Security

If you discover any security related issues, please email luis@kirschbaumdevelopment.com or nathan@kirschbaumdevelopment.com instead of using the issue tracker.

## Credits

- [Luis Dalmolin](https://github.com/luisdalmolin)
- [Our contributors](https://github.com/kirschbaum-development/laravel-translations-loader/graphs/contributors)

## Sponsorship

Development of this package is sponsored by Kirschbaum Development Group, a developer driven company focused on problem solving, team building, and community. Learn more [about us](https://kirschbaumdevelopment.com) or [join us](https://careers.kirschbaumdevelopment.com)!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
