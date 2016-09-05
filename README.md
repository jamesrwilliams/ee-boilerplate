# ExpressionEngine (EE) Boilerplate

## Setup

1. Download this boilerplate and unzip into your project root

2. Update project details in `package.json` and `site.js` and `site.scss`.

3. Install packages: `$ npm install`

4. Download EE files and unzip into *dist/public_html*

5. Run `$ gulp init` to setup directory. Moves `/system/` above `/public_html/`. Renames `/images/` to `/assets/`. Moves uploads to `/public_html/`.

6. Begin gulp `$ gulp watch`

## Additional Steps

Optionally add an encryption key to `$config['encryption_key']` ([see docs](https://docs.expressionengine.com/v2/general/system_configuration_overrides.html#encryption-key)) in [config.php](dist/system/expressionengine/config/config.php#L30). Get a randomly generated key from [this page](https://www.grc.com/passwords.htm). The *63 random alpha-numeric characters* will do.

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
|        |- global.group __________
|        |- page.group ____________
|        |- sitemap.group _________
|
|  |- public_html/
|     |
|     |- assets ___________________ Contains production ready minified css/js/imgs etc.
|     |
|     |- .htaccess ________________  
|     |- robots.txt _______________ 
|
|- docs/
|  |
|  |- checklist.md ________________ Reference checklist for common site requirements
|  |- addons.md ___________________ Recommended addons for the instillation
|
|- src/  __________________________ Uncompiled development code

```
