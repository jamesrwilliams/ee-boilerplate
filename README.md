# ExpressionEngine (EE) Boilerplate

## Local Setup

1. Download this boilerplate and unzip into your project root

2. Update Project Details in package.json and site.js and site.scss.

3. Install dependancies: `npm install`

4. Download EE files and unzip into *dist/public_html*

5. Setup structure: `$ gulp init`

6. Begin gulp: `$ gulp watch`

## Remote Setup

1. Optionally add an encryption key to `$config['encryption_key']` ([see docs](https://docs.expressionengine.com/v2/general/system_configuration_overrides.html#encryption-key)) in [config.php](dist/system/expressionengine/config/config.php#L30).
	Get a randomly generated key from [this page](https://www.grc.com/passwords.htm). The *63 random alpha-numeric characters* will do.

## Structure

```
_
|- gulpfile.js
|- package.json
|
|- dist/ __________________________ All Production Site Files (for upload to server)
|  |- app/
|     |- templates/
|        |
|        |- global.group __________
|        |- page.group ____________
|        |- sitemap.group _________
|
|  |- public_html/
|     |- assets ___________________ Contains production ready minified css/js/imgs etc.
|     |- themes ___________________
|     |- uploads __________________
|
|  |- system/ _____________________
|
|- docs/
|  |- checklist.md ________________ Reference checklist for common site requirements
|  |- addons.md ___________________ Recommended addons for the instillation
|
|- src/  __________________________ Uncompiled development code
|  |- js/
|  |
|  |- scss/

```
