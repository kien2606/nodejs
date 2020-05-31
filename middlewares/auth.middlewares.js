var db = require('../db'); 
module.exports.requireAuth = function(req,res,next){
	if(!req.cookies.userId){
		res.redirect('/auth/login');
		return;
	}
	var user = db.get('list').find({id:req.cookies.userId}).value();
	console.log(user);
	if(!user){
		res.redirect('/auth/login');
		return;
	}
	next();
}