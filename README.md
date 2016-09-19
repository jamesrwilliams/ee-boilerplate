# ExpressionEngine (EE) Boilerplate

Boilerplate for Fusion ExpressionEngine web projects.

## Setup

1. Download boilerplate and unzip into project folder.
2. Update project details. Reference details can be found `package.json` and `developer.json`.
3. Install packages: `$ npm install`
4. Download EE files from [ellislab.com](https://store.ellislab.com/manage) and then unzip the source files into `dist/public_html`.
5. Setup directory using `$ gulp setup`
6. Run the EE installation
7. Finalise the installation with `$ gulp config`

## Updating Boilerplate

To update the boilerplate to a more recent version simply download both the `package.json` and `developer.json` files to your project folder and run: `$ npm install`

## Utility gulp tasks

`$ gulp util:bust` - Add cache busting strings to the site.min.css and site.min.js files in /dist (note: you will have to run command again after further template edits).

`$ gulp util:update` - Update the system config details with those in developer.json.
