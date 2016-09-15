# ExpressionEngine (EE) Boilerplate

Boilerplate for Fusion ExpressionEngine web projects.

## Setup

1. Download boilerplate and unzip into project folder.
2. Update project details. Reference details can be found `package.json` and `developer.json`.
3. Install packages: `$ npm install`
4. Download EE files from [ellislab.com](https://store.ellislab.com/manage) and then unzip the source files into `dist/public_html`.
5. Setup directory using `$ gulp config`

## Utility gulp tasks

`$ gulp util:bust` - Add cache busting strings to the site.min.css and site.min.js files.

`$ gulp util:update` - Update the developer details and date in the css and js source files.

## Additional Steps

Optionally add an encryption key to `$config['encryption_key']` ([see docs](https://docs.expressionengine.com/v2/general/system_configuration_overrides.html#encryption-key)) in [config.php](src/config.php#L30). Get a randomly generated key from [this page](https://www.grc.com/passwords.htm). The *63 random alpha-numeric characters* will do.

