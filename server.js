const express = require('express');
const path = require('path');	
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());

//login page route
app.get('/', (req,res)=>{
	res.render(path.join(__dirname, '/login.ejs'), {url: '/login'});
})

// login handler route
app.post('/login', (req,res)=>{
	const {email, password} = req.body;
	
	findUser(email, password) ?
		// if user is registered
		// generate a dynamic url
		// redirect to user
		res.redirect(301, `/dashboard/${email}`) :
		res.status(401).end();

});

// dashboard route
app.get('/dashboard/:email', (req, res)=>{
	const {email} = req.params;
	res.render(path.join(__dirname, '/dashboard.ejs'), {email: email})
});

// damy user db
const users = [
	{
		name: "Pratyush kumar",
		email: "pratyush@email.com",
		password: "pratyush"
	},
	{
		name: "Chirag kumar",
		email: "chirag@email.com",
		password :"chirag"
	}
];

// find user
const findUser = (email, password)=> users.some(user =>
	user.email === email && user.password === password
)

// Start the server
app.listen(PORT, err =>{
	err ?
	console.log("Error in server setup") :
	console.log("Server listening on Port", PORT)
});
