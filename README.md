# ExpressionEngine (EE) Boilerplate

Boilerplate for Fusion ExpressionEngine web projects.

# Setup

### 1. Download boilerplate

Download and unzip into project folder.

### 2. Update project details

Reference details can be found `package.json` and `src/site.js` and `src/site.scss`.

### 3. Install packages: 
```
$ npm install
```
### 4. Download EE files

Download from [ellislab.com](https://store.ellislab.com/manage) and then unzip the source files into `dist/public_html`.

### 5. Setup directory using
```
$ gulp init
```

This moves the ExpressionEngine system directory to above `dist/public_html`, renames the images directory to assets, and moves the uploads directory out of assets to public_html. 

### 6. Begin gulp 
```
$ gulp watch
```

## Additional Steps

Optionally add an encryption key to `$config['encryption_key']` ([see docs](https://docs.expressionengine.com/v2/general/system_configuration_overrides.html#encryption-key)) in [config.php](src/config.php#L30). Get a randomly generated key from [this page](https://www.grc.com/passwords.htm). The *63 random alpha-numeric characters* will do.

## Structure

```
_
|- gulpfile.js
|- package.json
|
|- dist/ __________________________ All Production Site Files (for upload to server)
|  |- app/
|     |
|     |- templates/
|        |
|        |- global.group __________ Layouts and modules
|        |- page.group
|        |- sitemap.group _________ HTML & XML sitemaps
|
|  |- public_html/
|     |
|     |- assets ___________________ Contains production ready minified css/js/imgs etc.
|     |
|     |- .htaccess
|     |- robots.txt
|
|- docs/
|  |
|  |- checklist.md ________________ Reference checklist for common site requirements
|  |- addons.md ___________________ Recommended addons for the instillation
|
|- src/  __________________________ Uncompiled development code

```
