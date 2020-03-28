const Clarifai =require('clarifai');

const app = new Clarifai.App({
	apiKey: '41bb6566dad1441389f32d7aae1123c5'
});

const handleUrl = (req, resp) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		resp.json(data);
	})
	.catch(err => {
		resp.status(400).json('Error occured');
	})
}

const handleImage = (db) => (req, resp) => {
	const { id } = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		resp.json(entries[0]);
	})
	.catch(err => {
		resp.status(400).json('Unable to update entries');
	})
}


module.exports ={
	handleImage: handleImage,
	handleUrl: handleUrl
}