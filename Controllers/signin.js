const handleSignin = (db, bcrypt) => (req, resp) => {
	const { email, password } = req.body;

	if(email && password){
		db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(entry => {
			const isValid=bcrypt.compareSync(password, entry[0].hash);
			if(isValid){
				db.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					resp.json(user[0]);
				})
				.catch(err => {
					resp.status(400).json('Unable to sign in')
				})
			}
			else{
				resp.status(400).json('Email or Password is incorrect')
			}
		})
		.catch(err => {
			resp.status(400).json('Email or Password is incorrect')
		})
	}
	else{
		resp.status(400).json('Kindly fill required fields')
	}
}

module.exports ={
	handleSignin: handleSignin
}