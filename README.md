# brunch-plain-simple

> **DEPRECATED**: I am not currently using this boilerplate anymore. Most dependencies will be outdated, so if you still want to use this boilerplate, you need to upgrade the dependencies.

This is a minimalistic, plain, and customizable single-page app skeleton built using Brunch.

The aim is to provide a versatile server-client skeleton repository that I can simply use without too many extra configuration, yet still easy enough to configure if I want something different or something more.

## What's Inside

### Brunch + Babel + Less + PostCSS + etc.

[Brunch][brunch] is a fast and opinionated build tool. It has `npm` package support so I can `require()` Node modules. I prefer Brunch over [webpack][webpack] so I don't have to modify a lot of the configuration every time I created a new repository.

Included inside is various plug-ins I often use:
 - `babel-brunch`: allows new ES6 and React JSX syntaxes. I use `latest` and `react` as presets.
 - `less-brunch`: compiles LESS files.
 - `postcss-brunch`: post-processes CSS files. I use `cssnext` to allow new CSS syntaxes and automatically add brower prefixes.
 - `clean-css-brunch` / `uglify-js-brunch`: minify CSS and JS files.
 - `markdown-brunch`: compiles Markdown files as modules. Note that you currently cannot use the ES6 `import` syntax and have to use `require()`; see [below](#notes) for more information.
 - Other small plug-ins: `environment-brunch` (replaces `BRUNCH_ENVIRONMENT`), `json-brunch` (allows importing JSON files).

For the project structure, I mostly follow Brunch conventions (see [their docs][brunch-docs] for more information):
 - `app`: scripts and stylesheets
 - `app/assets`: static files (HTML files, fonts, favicons, etc.)
 - `vendor`: JavaScript/CSS libraries

One main difference is I ignored the root `test` folder, because I intend to use it for server-side tests. See [below](#testing) for more information.

### Redux + React

`main.js` contains the boilerplate code for using [Redux][redux] and [React][react] with [react-router][react-router] and support for [Redux DevTools][redux-devtools]. If you need to change it, you only need to modify these lines to provide your own reducer, middlewares, and React root element:

```js

// Replace this with your own reducer
import reducer from './reducers'

const middlewares = [
  // Insert redux middlewares here
]

// Replace this with your own React root element
render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
```

I put the [Redux Todo App][redux-todo] code as example along with its folder structure, but feel free to roll out your own structure.

If you want remove Redux and React, simply replace `main.js` with your own script. Just remember to `require('main')` inside your HTML page to run the script:

```html
<script src="lib.js"></script>
<script src="app.js"></script>
<script>require('main')</script>
```

### Bootstrap + jQuery Slim

I often use [Bootstrap][bootstrap] (particularly for prototyping purpose), so I put Bootstrap along with [jQuery slim][jquery] in `vendor`.

Note that I added this configuration in `brunch-config.coffee` to make jQuery placed before Bootstrap:

```coffee
order:
  # Load jQuery earlier
  before: [/jquery/]
  after: []
```

If you remove Bootstrap and jQuery, you can remove these lines.

### Express server

I use [Express][express] as the server framework. `server.js` contains a very simple static file server serving `public/` with HTML5 pushState support:

```js
const basedir = __dirname + '/public'

app.use(express.static(basedir))
app.get('*', (req, res) => res.sendFile('index.html', { root: basedir }))
```

You can add other middlewares to serve endpoints before them. If you don't need pushState, simply remove the last line.

## Usage

### Installation

Clone the repository at https://github.com/tkesgar/brunch-plain-simple, then perform `npm install` to install dependencies. If you don't want to build the app, you can use `npm install --production` to only install `dependencies` and ignore `devDependencies`.

### Development

Use `npm run watch:server` to start the server with [nodemon]. If you modify any files, nodemon will automatically restart your server. By default, the server listens on port 8080; you can modify it by specifying `PORT` environment variables, using `export PORT=1412` in Linux or `set PORT=1412` in Windows.

Use `npm run watch:app` to start Brunch watcher. Brunch will automatically rebuilt the app when the content of `app` changes. Note that there are no server serving the files; Brunch only watches the files.

Finally, simply run `npm run watch` to run both `watch:server` and `watch:app`.

### Testing

For server-side tests, I use [Mocha][mocha] and [Chai][chai]. You can write the tests in `test/` folder, and run them with `npm test` (or simply `mocha` if you install mocha globally). If you want to use something else, simply remove both of them from `package.json`.

For client-side tests, you can open `test.html` in the browser to run Mocha and Chai in browser. Since `test/` is reserved for server-side tests, you can write the tests in `app/test/`. All files inside `app/test/` will be removed on production build.

### Building and Deploying

To build the app, use `npm run build`. It runs Brunch build in production environment and also remove test files. Once you've done, the folder `public/` contains all the necessary files you can simply deploy or serve.

If you only need to deploy the static files, you can deploy to a web server using FTP/SFTP with [DPLOY][dploy]. See their [documentation][dploy-docs] for more information on how to use DPLOY. You can use `npm run dploy:install` to generate a `dploy.yaml` and `npm run dploy` to deploy at the first available environment described in `dploy.yaml`. For security reasons (since your configuration might contain passwords), `dploy.yaml` is excluded on `.gitignore`.

If you need the Express server, you should make sure to deploy the server and `public/`. You can use `npm start` to run the server.

[Heroku][heroku] deployment is supported with the ruthlessly simple `Procfile`, which simply runs `server.js`. Just make sure that you put all the required dependencies to run the server as `dependencies`. For everything else (browser modules/build tools), put it in `devDependencies` instead.

## Notes

### Using SASS/SCSS

Simply remove `less-brunch` and install `sass-brunch`.

### Using npm modules in browser

Brunch supports it by default. Just make sure you added it in `devDependencies` or `dependencies`. Usually you should add it in `devDependencies`, since `dependencies` will be installed if you need to run your server at, for example, Heroku.

### Compiled Markdown modules

If you put a Markdown file inside `app/`, it will be compiled as a module; you can `require()` it inside your code as a compiled string:

```js
// app/yahallo.md: Yahallo!
console.log(require('yahallo'))  // <h1>Yahallo!</h1>
```

However, you cannot `import` it using ES6 syntax because `markdown-brunch` does not wrap it as a CommonJS module. So, you should use `require()` instead.

## Todo

 - [ ] Add lint
 - [ ] Make better sample
 - [ ] Perhaps add small React components I often use

## Contributions

Feel free to report bugs or make pull requests at [GitHub][issues].

## License

Licensed under [MIT License](LICENSE).

[brunch]: http://brunch.io/
[webpack]: https://webpack.github.io/
[brunch-docs]: http://brunch.io/docs/config
[redux]: http://redux.js.org/
[react]: https://facebook.github.io/react/
[react-router]: https://github.com/ReactTraining/react-router
[redux-devtools]: https://zalmoxisus.github.io/redux-devtools-extension/
[redux-todo]: http://redux.js.org/docs/basics/ExampleTodoList.html
[bootstrap]: https://getbootstrap.com/
[jquery]: https://jquery.com/
[express]: http://expressjs.com/
[nodemon]: https://github.com/remy/nodemon
[mocha]: https://mochajs.org/
[chai]: http://chaijs.com/
[dploy]: https://leanmeanfightingmachine.github.io/dploy/
[dploy-docs]: https://github.com/LeanMeanFightingMachine/dploy
[heroku]: https://dashboard.heroku.com/
[issues]: https://github.com/tkesgar/brunch-plain-simple/issues
