const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv =  require("dotenv");
const path = require('path');
const ses = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();
app.use(bodyParser.urlencoded({extended: false}))

app.set("view engine","pug");
app.set("views", "./View");
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const exressSession = require('express-session');

app.use(express.static(path.join(__dirname,"/css")))
app.use(express.static(path.join(__dirname,"/View")));
app.use(cookieParser());
app.use(cors());


app.use(ses({
    secret: 'secret',
    cookie: {maxAge:3000},
    saveUninitialized: false
}));

const errorConstroller = require('./controllers/error');


app.use(userRoutes);
app.use('/admin',adminRoutes);
app.use(errorConstroller.get404);

app.listen(3000, () =>{
    console.log('Listenning port on 3000...');
});
