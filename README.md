Todo List Application Backend (interview task for Vicinity Charter)
==================================
Backend following REST architecture made on Express framework using MongoDB as database and built tools to use sugary Javascript.

This is currently hosted at: https://tadalist-app.herokuapp.com/

Read docs at: https://tadalist-app.herokuapp.com/docs

All API endpoints can be accessed via: /api
For example: https://tadalist-app.herokuapp.com/api/users/login

# Some details about API design
The backend is fully RESTful and rely on JWT for authorizing clients.

This is a most modern web application that expose APIs which clients can use to interact with the application. Like this a well-designed web API should aim to support:

*Platform independence*. Any client should be able to call the API, regardless of how the API is implemented internally. This requires using standard protocols, and having a mechanism whereby the client and the web service can agree on the format of the data to exchange.

*Service evolution*. The web API should be able to evolve and add functionality independently from client applications. As the API evolves, existing client applications should continue to function without modification. All functionality should be discoverable, so that client applications can fully utilize it.

I've put all the api v1 endpoints currently in _src/api_ folder and divided folders such that all the bussiness logic (controllers) lies in _<api_name>/<api_name>.js_ file (relative to _/src/api_) and the routes are defined in _<api_name>/index.js_.

The API is scalable so if we want to make another version (V2) of the API for clients, just move the _src/models_ to _src/api_version/models_ and create another folder for api_v2 and add it as middleware in _index.js_ file.

Basic principles like <b>DRY</b>, <b>Single Responsibility</b> and <b>Separation of Concerns</b> have also been followed.

# Steps to run/build
- run `npm install` in current directory to install all dependencies
- run `npm run dev` to start development server

  or
- run `npm run build` to build the generate a dist folder with transpiled code

# Steps to build API docs
- run `npm install -g apidoc`
- run `apidoc -i src/api -o docs/`
- Now, apidocs has been generated in docs directory
