const users = [{id:"u0000001", first:"Michael", last:"Clinton", pass:"test123", email:"michael.john.clinton@gmail.com"}]; 

exports.add = function(user)
{
	if(user)
	{
		users.push(user);
		return "User added";
	}
	
	return "User failed";
}

exports.authenticate = function(email, pass)
{
	if(email && pass)
	{
		for(var i = 0; i < users.length; i++)
		{
			if(users[i].email.toLowerCase() == email.toLowerCase() && users[i].pass == pass)
			{
				return true;
			}
		}
	}
	
	return false;
}

exports.get = function(id)
{
	for(var i = 0; i < users.length; i++)
	{
		if(users[i].id == id)
		{
			return users[i];
		}
	}
	
	return null;
}