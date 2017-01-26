#### Demonstration of an express app with authentication via JSON Web Token

- RESTful API
- Bcrypt password hashing
- JSON Web Tokens
- Sequelize mysql ORM
- React Redux
- Babel
- Webpack
- Nodemon

```
$ git clone https://github.com/dallinn/node-auth
$ cd node-auth
$ npm install
$ npm run
```

File structure description:
```
node-auth
│   nodemon.json //nodemon configuration to run 'webpack' on restart
|   package.json //project dependencies and npm scripts (ie 'npm run')
|   webpack.config.js //webpack configuration for use with react, babel
|   server.js //creates new express app and serves 'api' and 'client' routes
│
└───api //all routes here are sent through /api/ middleware
│   │   common.js //common functions used througout the api
│   │
│   └───models //folder for models, uses sequelize ORM
|   └───routes //contians logic for specific routes, pulls in necessary modles, esentially controllers
|   |          //authentication logic stored in this folder
│   
└───client
|    └───build //directory that faces the public
|    └───src //precompiled assets
|
```