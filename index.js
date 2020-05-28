var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ list: [] })
  .write();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var port = 3000;
// list = [
// 	{name : 'kien',id : 1},
// 	{name : 'nam',id : 2},
// 	{name : 'long',id : 3},
// ]
app.set('view engine', 'pug');
app.set('views','./views');
app.get('/',function(req,res){
		res.render('index');
});
app.get('/users',function(req,res){
	res.render('users/index',
	{
	users: db.get('list').value()
	});
});
app.get('/users/creative',function(req,res){
	res.render('creative/index');

});
// app.get('/users/:id',function(req,res){
// 	var id = req.params.id;
// 	var user = db.get('list').find({id:id}).value();
// 	res.render('users/view',{
// 		users : user
// 	});
// });
app.get('/users/search',function(req,res){
	// var q = req.query.q;
	// var match = list.filter(function(user){
	// 	return user.name.indexOf(q) !== -1;
	// });
	// res.render('users/index',{
	// 		users:match
	// 	});
	var q = req.query.q;
	var x = db.get('list').value();
	var match = x.filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	
	res.render('users/index',{
		users:match
	});
	
	
});
app.get('/users/:id',function(req,res){
	var id = req.params.id;
	var user = db.get('list').find({id:id}).value();
	res.render('users/view',{
		users : user
	});
});
app.post('/users/creative',function(req,res){
	req.body.id=shortid.generate();
	db.get('list').push(req.body).write();
	res.redirect('/users');
});

app.listen(port,function(){
	console.log('hello world');
	var x = db.get('list').value();
	console.log(x);
});
// use library lowdb just to learn or small project