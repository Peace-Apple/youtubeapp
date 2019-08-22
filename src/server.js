// import the package
import express from 'express';
import bodyParser from 'body-parser';
// import expressValidator from 'express-validator';
// import expressSession from 'express-session';
import cors from 'cors';
import exphbs from "express-handlebars";
import passport from 'passport';
import passportJWT from 'passport-jwt';
import flash from 'connect-flash';
// import cookieParser from 'cookie-parser';
import session from 'express-session';
import Router from '../src/routes/routes';

const port = process.env.PORT || 3005;


//execute it by initiating our app
const app = express(); 

// to serve static files in express
app.use(express.static('public'))

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);

app.use(cors())

//tell express that it should accept json
app.use(bodyParser.json())

// app.use(expressValidator())

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

app.use(session({ 
  secret: 'applelurve', 
  cookie: { maxAge: 60000 }, 
  resave: false, saveUninitialized: false 
}));

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'applelurve';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

app.use(passport.initialize());

app.use(passport.session()); 
app.use(flash());


// mount all routes on /api/v1/subscribers in our server
app.use('/api/v1', Router)

// starting our express server
app.listen(port, () => {console.log(`Server started on port ${port}...`)});
