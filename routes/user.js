
/*
 * GET users listing.
 */

exports.list = function(req, res){
  var doll = req.params.id;
  if(req.get("pjax") === "true"){
  	  res.send("images/"+ doll +".gif");
  }
  else{
  	  res.render('index', { doll: doll });
  }
};