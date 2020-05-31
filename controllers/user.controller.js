var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  res.render('users/index', {
    users: db.get('list').value()
  });
};
module.exports.creative = function(req,res){
	res.render('creative/index'); }

module.exports.search = function(req,res){	
	var q = req.query.q;
	var x = db.get('list').value();
	var match = x.filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index',{
		users:match
	});	
}

module.exports.getID = function(req,res){
	var id = req.params.id;
	var user = db.get('list').find({id:id}).value();
	res.render('users/view',{
		users : user
	});
}

module.exports.postCreat = function(req,res){
	req.body.id=shortid.generate();
	var error = [];
	if( !req.body.name){
		 error.push('Name is required');
	}
	if(!req.body.phone){
		error.push('Phone is required');
	}
	if(error.length > 0){
		res.render('creative/index',{
			errors: error,
			values: req.body
		});

	}
	if(error.length == 0){
	db.get('list').push(req.body).write();
	res.redirect('/users');
	}
}
