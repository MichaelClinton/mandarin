const http = require('http');
const recipies = [{id:"r00000001", name:"Pepper Chicken", ingredients:["a0000001", "a0000002","a0000003"]}]; 


exports.add = function(recipe)
{
	if(recipe)
	{
		recipies.push(recipe);
		return "Recipe added";
	}
	
	return "Recipe failed";
}

exports.get = function(id)
{
	for(var i = 0; i < recipies.length; i++)
	{
		if(recipies[i].id == id)
		{
			return recipies[i];
		}
	}
	
	return null;
}
