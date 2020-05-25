var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var port = 3000;
list = [
	{name : 'kien',id : 1},
	{name : 'nam',id : 2},
	{name : 'long',id : 3},
]
app.set('view engine', 'pug');
app.set('views','./views');
app.get('/',function(req,res){
		res.render('index');
});
app.get('/users',function(req,res){
	res.render('users/index',
	{
	users: list
	});
});
app.get('/users/creative',function(req,res){
	res.render('creative/index');

});
app.post('/users/creative',function(req,res){
	list.push(req.body);
	res.redirect('/users');
});
app.get('/users/search',function(req,res){
	var q = req.query.q;
	var match = list.filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index',{
			users:match
		});
});
app.listen(port,function(){
	console.log('hello world');
});
