const http = require('http');
const books = [{id:"b0000001", name: "My Book", owner:"u0000001", recipies:["r0000001"]}];  

exports.add = function(book)
{
	if(book)
	{
		books.push(book);
		return "Book added";
	}
	
	return "Book failed";
}

exports.get = function(id)
{
	for(var i = 0; i < books.length; i++)
	{
		if(books[i].id == id)
		{
			return books[i];
		}
	}
	
	return null;
}