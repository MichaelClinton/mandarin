const users = require('../user/component.js');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const salt = 'i6mPqD6uvV';

function encrypt(text)
{
  var cipher = crypto.createCipher(algorithm, salt);
  var crypted = cipher.update(text,'utf8','hex');
  
  crypted += cipher.final('hex');
  
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm, salt);
  var dec = decipher.update(text,'hex','utf8');
  
  dec += decipher.final('utf8');
  
  return dec;
}

exports.getToken = function(user, pass)
{	
	try
	{
		if(users.authenticate(user, pass))
		{
			var date = new Date();
			
			date.setDate(date.getDate() + 30);
			
			return {token: encrypt('{"user":"' + user + '", "password":"' + pass + '", "expiration":"' + date.toUTCString() + '"}')};
		}
	}
	catch(error)
	{
		console.log(error);
	}
	
	return false;
}

exports.authenticateToken = function(token)
{
	try
	{
		var request = JSON.parse(decrypt(token));
		var date = new Date();
			
		if(date < Date.parse(request.expiration))
		{
			if(users.authenticate(request.user, request.password))
			{
				return request;
			}
		}
	}
	catch(error)
	{
		console.log(error);
	}
	
	return false;
}