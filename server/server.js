const fetch = require('node-fetch');
const config = require('universal-config');
const { createApi } = require('unsplash-js');
const toJson = require('unsplash-js').toJson;
const express = require('express');

global.fetch = fetch;

const unsplash = createApi({
    accessKey: config.get('APPLICATION_ID'),
});

const app = express();

app.get('/api/photos', (req, res) => {
    unsplash.photos.list({ page: 1, perPage: 30 })
        .then(result => res.json(result.response))
        .catch(error => res.status(500).json({ error: error.message }));
});

const PORT = process.env.PORT || 5000;   

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));