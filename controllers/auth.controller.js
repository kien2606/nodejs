var db = require('../db'); 
module.exports.login = function(req,res){
	res.render('auth/login');
};
module.exports.postLogin= function(req,res){
	var email = req.body.email;
	var user = db.get('list').find({email:email}).value();
	var password = req.body.password;
	if(!user){
		res.render('auth/login',{
			errors: ['Users doesnt exits'],
			values: req.body
		});
		return;
	}
	if(user.password !== password){
		res.render('auth/login',{
			errors: ['Wrong password'],
			values: req.body

		});
		return;
	}
	res.cookie('userId' , user.id);
	res.redirect('/users');
 };
