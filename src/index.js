const http = require('http');  
const port = 3000;
const authentication = require('./authentication/component.js');
const book = require('./book/component.js');
const ingredient = require('./ingredient/component.js');
const recipe = require('./recipe/component.js');
const user = require('./user/component.js');

function setTokenHeader(response)
{	
	response.setHeader('Access-Control-Allow-Origin', '*');
	//response.setHeader("Access-Control-Allow-Credentials", "true");
	response.setHeader("Access-Control-Allow-Methods", "*");
	response.setHeader("Access-Control-Allow-Headers", "*");
	//response.setHeader('Content-Type', 'text/html');
}

function setAuthenticationHeader(response)
{
	response.setHeader('Access-Control-Allow-Origin', '*');
	//response.setHeader("Access-Control-Allow-Credentials", "true");
	response.setHeader("Access-Control-Allow-Methods", "*");
	response.setHeader("Access-Control-Allow-Headers", "*");
	//response.setHeader('Content-Type', 'text/html');
}

const requestHandler = (request, response) => 
{  	
	switch(request.url)
	{
		//************************************************************************************************
		//Book********************************************************************************************
		//************************************************************************************************
		case '/book':
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(JSON.stringify(book.get(request.headers['mikan-id'])));
			}
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
			}	
			
			response.end();
			
			break;
		
		case '/book/add':
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(book.add({id:"b0000002", name: "My Book 2", owner:"u0000001", recipies:[]}));
			}
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
			}	
		
			response.end();
			
			break;
			
		//************************************************************************************************
		//Ingredient**************************************************************************************
		//************************************************************************************************
		case '/ingredient':
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(JSON.stringify(ingredient.get(url[1])));				
			} 
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
			}	
			
			response.end();
			
			break;	
			
		case '/ingredient/add':
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(ingredient.add({id:"i0000004", name:"ground beef"}));
			}
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
			}
			
			response.end();
			
			break;
			
		case '/ingredient/all':
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(JSON.stringify(ingredient.getAll()));
			}
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
			}
			
			response.end();
			
			break;
		
		//************************************************************************************************
		//Recipe******************************************************************************************
		//************************************************************************************************
		case '/recipe':	
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(JSON.stringify(recipe.get(url[1])));
			}
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
			}
			
			response.end();
			
			break;
			
		case '/recipe/add':	
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(recipe.add({id:"r00000002", name:"Other Chicken", ingredients:["a0000001", "a0000002"]}));
			}
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
			}
			
			response.end();
			
			break;
			
		//************************************************************************************************
		//User********************************************************************************************
		//************************************************************************************************	
		case '/user':
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(JSON.stringify(user.get(request.headers['mikan-id'])));
			}
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
			}
			
			response.end();
			
			break;
		
		case '/user/add':
			setTokenHeader(response);
			
			if(authentication.authenticateToken(request.headers['mikan-token']))
			{
				response.write(user.add({id:"u0000002", first:"Mid", last:"Eval", pass:"321tset", email:"mid3val@gmail.com"}));
			}
			else
			{
				response.write(JSON.stringify({error: "token invalid"}));
				}
			
			response.end();
			break;
					
		//************************************************************************************************
		//Authenticate************************************************************************************
		//************************************************************************************************		
		case '/authenticate':
			setAuthenticationHeader(response);
				
			console.log(request.headers['mikan-user']);
			console.log(request.headers['mikan-password']);
			
			var token = authentication.getToken(request.headers['mikan-user'], request.headers['mikan-password']);
			
			if(token)
			{
				response.statusCode = 200;
				response.statusMessage = 'OK';
				response.write(JSON.stringify(token));
				response.end();
			}
			else
				
			{
				response.statusCode = 500;
				response.statusMessage = 'Unable to Authenticate';
				response.end();
			}
			
			
			break;
			
		//************************************************************************************************
		//Unknown Request*********************************************************************************
		//************************************************************************************************
		default:
			response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
			response.setHeader('Content-Type', 'text/html');
			response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
			response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
			response.statusCode = 500;
			response.statusMessage = 'Unknown request';
			response.end();
			
			break;
	}
}



const server = http.createServer(requestHandler)

server.listen(port, (error) => 
{  
	if (error)
	{
		return console.error(error);
	}

	console.log('Mandarin: Server is live');
});