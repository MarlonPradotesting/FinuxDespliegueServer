const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const {engine} = require('express-handlebars');
const path = require('path');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const { database }= require('./keys');
const passport = require('passport');
const session = require('express-session');
const mysqlstore = require('express-mysql-session')(session);
const MySQLStore = require('express-mysql-session');
const SwaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();
// Intializations
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers')

}));
app.set('view engine', 'hbs');



app.set('PORT', process.env.PORT || 4000 );
// Middleware para verificar el token de autenticación
    

  app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: new mysqlstore(database)
  }));

        

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
 






//Variables Globales

app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.error = req.flash('error');
    next();
});


//Rutas
app.use(require('./routes/homepage/acceso'));



//Documentation Swagger API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finux  REST  API Documentation",
      version: "1.0.0",
      description: "Una libreria de endpoints de proyecto Finux"
    },
    servers: [
      {
        url: "http://localhost:4000"
      }
    ]
  },
  apis: [`${__dirname}/routes/homepage/*js`]
};

const specs = swaggerJsDoc(options);



app.use("/doc-api", SwaggerUI.serve, SwaggerUI.setup(specs))


//Public
app.use(express.static(path.join(__dirname, 'public')));
//Arrancando el servidor
app.listen(app.get('PORT'), () => {
    console.log('Servidor corriendo en el puerto', app.get('PORT'));
});
