require('dotenv').config({ 'path': './.env' })
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const globalSession = require('./middlewares/session')
const localeMiddleware = require('./middlewares/locale')
const bodyParser = require('body-parser')
const expressLayout = require('express-ejs-layouts')
const app = express()
const path = require('path')
const { I18n } = require('i18n')
const storage = require('node-sessionstorage')
const flash = require('express-flash');

const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const DB_HOST = encodeURIComponent(process.env.DATABASE_HOST)
const DB_PORT = process.env.DATABASE_PORT
const DB_NAME = encodeURIComponent(process.env.DATABASE_NAME)
const BASE_URL = process.env.BASE_URL

// requires all the routes
const admin_routes = require('./routes/admin')
const employer_routes = require('./routes/employer')
const auth_routes = require('./routes/auth')

// register all the assets
app.use(BASE_URL + 'css', express.static(__dirname + '/public/css'))
app.use(BASE_URL + 'js', express.static(__dirname + '/public/js'))
app.use(BASE_URL + 'img', express.static(__dirname + '/public/img'))
app.use(BASE_URL + 'fonts', express.static(__dirname + '/public/fonts'))
app.use(BASE_URL + 'json', express.static(__dirname + '/public/js/json'))

// i18n configuration
const i18n = new I18n()
i18n.configure({
   locales: ['en', 'gr', 'ar'],
   register: global,
   defaultLocale: 'en',
   directory: path.join(__dirname, '/locales')
})

app.use(i18n.init)
app.use(expressLayout)
const store = new MongoDBStore({
   uri: 'mongodb://' + DB_HOST + ':' + DB_PORT + '/' + DB_NAME + '',
   collection: 'sessions'
})
app.use(session({
   secret: '.D>8z]?H?{(DqzJ*',
   resave: false,
   saveUninitialized: true,
   cookie: {
      secure: false,
      maxAge: 691200000
   },
   store: store
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));

app.use(globalSession.globalSession)
app.use(globalSession.errorMessage)
app.locals.base = BASE_URL
app.use(function (request, response, next) {
   response.locals.base = BASE_URL
   next()
})

app.use(flash());
app.set('layout', './layout/app')
app.set('view engine', 'ejs')
app.use(localeMiddleware.currentRoute)


// registering all the routes
app.use(BASE_URL + 'admin', admin_routes)
app.use(BASE_URL + 'employer', employer_routes)
app.use(BASE_URL + '', auth_routes)
app.use(localeMiddleware.activeLocale)
app.get('/simulations/:simulationId/:fileName', (req, res) => {
   const { simulationId, fileName } = req.params;
   const filePath = path.join(__dirname, 'public', 'simulations', simulationId, fileName);
   res.sendFile(filePath);
});
app.get('/resumes/:fileName', (req, res) => {
   const { fileName } = req.params;
   const filePath = path.join(__dirname, 'public', 'resumes', fileName);
   res.sendFile(filePath);
});
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://' + DB_HOST + ':' + DB_PORT + '/' + DB_NAME + '', { useNewUrlParser: true, useUnifiedTopology: true }).
   then(() => console.log("Mongodb connected successfully !")).
   catch(error => console.log(error))

app.listen(PORT, () => console.info("App is running on port " + PORT))