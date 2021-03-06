const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd84db210d5794c24bd90edd2f25f4321'
    // apiKey: 'c0c0ac362b03416da06ab3fa36fb58e3'
   });

const handleApiCall = (req,res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}
   
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}