var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoutes = require('./routes/user.routes');
var authRoutes = require('./routes/auth.route');

var authMiddlewares = require('./middlewares/auth.middlewares');

var port = 3000;
var app = express();
app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',function(req,res){
		res.render('index');
});

app.use('/users', authMiddlewares.requireAuth, userRoutes);
app.use('/auth', authRoutes);

app.listen(port,function(){
	console.log('hello world');
});
// use library lowdb just to learn or small project