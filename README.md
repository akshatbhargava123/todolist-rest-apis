Todo List Application Backend (interview task for Vicinity Charter)
==================================
Backend following REST architecture made on Express framework using MongoDB as database and built tools to use sugary Javascript.

This is currently hosted at: https://tadalist-app.herokuapp.com/
Read docs at: https://tadalist-app.herokuapp.com/docs

# Steps to run
- run `npm install` in current directory to install all dependencies
- run `npm run dev` to start development server

  or
- run `npm run build` to build the generate a dist folder with transpiled code

# Steps to build API docs
- run `npm install -g apidoc`
- run `apidoc -i src/api -o docs/`
- Now, apidocs has been generated in docs directory
