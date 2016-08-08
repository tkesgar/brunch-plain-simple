# brunch-plain-simple

A minimalistic, plain, and customizable Brunch skeleton using ES6, React, and PostCSS.

## Notes

* `/public` folder is ignored in `.gitignore`. Remove the line if you want to check `/public` into repository.
* All NPM, Bower, and `/vendor` files are written into `lib.css` and `lib.js`, while application scripts and stylesheets are written into `app.css` and `app.js`. Make sure to include it in your page and `require()` the JS module.
* `appcache-brunch` automatically generates HTML5 application manifest on build. If you did not need it, remove `manifest="appcache.appcache"` from your `<html>` tag and remove the package with `npm remove appcache-brunch --save-dev`.
* `es2015` and `react` preset for `babel` is included in the skeleton.

## Installation

Clone this repo manually or use `brunch new dir -s tkesgar/brunch-plain-simple`

## Getting started

* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * Brunch plugins and app dependencies: `npm install`
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io), [Getting started guide](https://github.com/brunch/brunch-guide#readme)
