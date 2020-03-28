const handleRegister = (db, bcrypt) => (req, resp) => {
	const { name, email, password } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	if (name && email && password)
	{	
		db.transaction(trx => {
			trx.insert({
				email: email,
				hash: hash
			})
			.into('login')
			.returning('email')
			.then(loginEmail =>{
				trx('users')
				.returning('*')
				.insert({
					name : name,
					email: loginEmail[0],
					joining: new Date()
				})
				.then(user => {
					resp.json('Successfully registered user');
				})
				.then(trx.commit)
				.catch(trx.rollback)
			})
			.catch(err => {
			resp.status(400).json('Unable to register');
		})
		})

	}
	else{
		resp.status(400).json('Kindly fill the required fields for registration');
	}
}

module.exports ={
	handleRegister: handleRegister
}