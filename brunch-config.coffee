module.exports =

  paths:
    # Ignore test folder
    watched: ['app', 'vendor']

  # Separate lib/app
  # Also separate test so we can remove it from production
  files:
    javascripts:
      joinTo:
        'lib.js': [/^(?!app)/]
        'app.js': [/^app/, /^(?!app\/test)/]
        'test.js': /^app\/test/
      order:
        # Load jQuery earlier
        before: [/jquery/]
        after: []
    stylesheets:
      joinTo:
        'lib.css': [/^(?!app)/]
        'app.css': [/^app/, /^(?!app\/test)/]
        'test.css': /^app\/test/
    templates:
      joinTo: 'app.js'

  plugins:
    babel:
      # Insert babel presets here
      presets: ['latest', 'react']
    postcss:
      processors: [
        # require() PostCSS processors here
        require('postcss-cssnext')
      ]
