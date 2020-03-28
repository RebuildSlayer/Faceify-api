const handleProfile = (db) => (req, resp) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		if(user.length){
			resp.json(user[0]);
		}
		else{
			resp.status(400).json('No user found');
		}
	})
	.catch(err => {
		resp.status(400).json('Unable to find the required user');
	})
}

module.exports ={
	handleProfile: handleProfile
}