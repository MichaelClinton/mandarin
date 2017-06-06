const http = require('http');  
const ingredients = [{id:"i0000001", name:"salt"}, {id:"i0000002", name:"pepper"}, {id:"i0000003", name:"chicken"}];

exports.add = function(ingredient)
{
	if(ingredient)
	{
		ingredients.push(ingredient);
		return "Ingredient added";
	}
	
	return "Inredient failed";
}

exports.get = function(id)
{
	for(var i = 0; i < ingredients.length; i++)
	{
		if(ingredients[i].id == id)
		{
			return ingredients[i];
		}
	}
	
	return null;
}

exports.getAll = function()
{
	return ingredients;
}
