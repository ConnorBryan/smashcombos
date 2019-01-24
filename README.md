# SmashCombos

## Folder Structure

├── functions - `Netlify Function` lambdas, transpiled from `src/functions`.
├── src - Pre-transpiled functionality for the entire application.
| ├── characters - Character data files for everyone in the cast, in JSON format.
| ├── cms - Templates and other code configuration for Netlify CMS.
| ├── components - Global React components used across multiple modules.
| ├── config - JSON files that have app-wide effects.
| ├── functions - Pre-transpiled `Netlify Function` lambdas.
| ├── img - Non-static image assets.
| ├── modules - Self-contained chunks of app functionality.
| | ├── ExampleModule
| | | ├── components - React components only used inside the parent module.
| | | ├── Module.js - The primary React component file for the module.
| | | ├── constants.js - Variables only used inside of the module.
| | | ├── helpers.js - Pure functions only used inside of the module.
| | | ├── index.js - Directory interface.
| ├── pages - React components that correlate to routes in the application.
| ├── providers - React Context components which export a context and a context provider.
| ├── semantic - Styles and overrides for Semantic UI.
| ├── services - Class files which interact with external APIs at runtime.
| ├── styles - Reusable CSS-in-JS style snippets.
| ├── templates - Gatsby templates for use in programmatic page creation.
| ├── utils - Utility React components with functionality other than rendering views.
| ├── constants.js - Variables used across multiple modules.
| ├── helpers.js - Functions used across multiple modules.
├── static - Files and assets directly accessible by URL.
| ├── admin - Administrative directory containing files used by Netlify CMS.
| ├── img - Images to be compiled by `gatsby-transformer-sharp`.
├── .gitignore - Files for `git` to ignore.
├── gatsby-browser.js - This file is where Gatsby expects to find any usage of the Gatsby browser APIs (if any). These allow customization/extension of default Gatsby settings affecting the browser.
├── gatsby-config.js - This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc.
├── gatsby-node.js - This file is where Gatsby expects to find any usage of the Gatsby node APIs (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.
├── iterate-characters.js - A NodeJS script to be used as a template to iterate over all character data files and perform any function.
├── LICENSE - The license associated with SmashCombos.
├── netlify.toml - A configuration file that dictates how Netlify will build and deploy your site — including redirects, branch and context specific settings, and much more.
├── package.json - Standard node package manifest.
├── README.md - This file.
├── renovate.json - Automated dependency updates. Multi-platform and multi-language.
