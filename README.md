## Getting started:

```bash
# Download repository:
git clone https://github.com/VSO-83/webpack-pug-sass.git webpack-template

# Go to the app:
cd webpack-template

# Install dependencies:
npm install

# Server with hot reload at http://localhost:9000/
npm run start

# Output will be at dist/ folder
npm run build
```
## Other commands:

package.json scripts are used to execute commands, to run one you should type 
`npm run {command name}`

Command name | Description
--- | ---
create::component `{component name}` | Creates empty component in components directory with Pug, SCSS and JS files
create::page `{page name}`      | Creates page in pages directory with the same files as for a component

## Notes

* All pages are included as Webpack entries automatically, directory name of the page should be the same as page name