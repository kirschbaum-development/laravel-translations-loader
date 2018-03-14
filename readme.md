# Laravel Translations Loader

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
            "failed": "These credentials do not match our records."
        }
    }
}
```

And so on, with all your languages and all your translation strings.

#### Load only JSON translations

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/json!@kirschbaum-development/laravel-translations-loader';
```

#### Load only PHP translation files

```js
import languageBundle from '@kirschbaum-development/laravel-translations-loader/php!@kirschbaum-development/laravel-translations-loader';
```

***

### Useful packages to use with laravel-translations-loader

* [i18next](https://www.i18next.com/)
* [vue-i18next](https://github.com/panter/vue-i18next)
* [vue-i18n](https://github.com/kazupon/vue-i18n)
* [react-i18next](https://github.com/i18next/react-i18next)
