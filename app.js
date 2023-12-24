const express = require("express")
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./database')
const expressLayouts = require('express-ejs-layouts');
const port = 8080;
const method_override = require('method-override')
const session = require('express-session');
const flash = require("connect-flash");


const ketSampahRouter = require('./routes/ketSampahRouter')
const sampahMasukRouter = require('./routes/sampahMasukRouter')
const jualSampahRouter = require('./routes/jualSampahRouter')
const riwayatPenjualanRouter = require('./routes/riwayatPenjualanRouter')
const dashboard = require('./routes/dashboardRoute')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/img', express.static('img'))
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

app.use(expressLayouts);
app.set('layout', './layouts/container.ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')   

app.use((req, res, next)=> {
    req.db = db;
    next();
})


app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}))

app.use(flash())
app.use(method_override("_method"))
app.use((req, res, next)=> {
    res.locals.message = req.flash();
    next();
})

app.use('/keteranganSampah', ketSampahRouter);
app.use('/sampahMasuk', sampahMasukRouter);
app.use('/jualSampah', jualSampahRouter);
app.use('/riwayatPenjualan', riwayatPenjualanRouter);
app.use('/', dashboard)



app.use(logger('dev'))
app.use(express.json());
app.use(cookieParser());


app.listen(port, () => console.log(`Server Running in port ${port}`))