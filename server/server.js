// Import required packages
const fetch = require('node-fetch').default; // Node.js does not have fetch by default
global.fetch = fetch; // Ensures Unsplash can use fetch()
const config = require('universal-config');
const { createApi } = require('unsplash-js');
const toJson = require('unsplash-js').toJson;
const express = require('express');


// Create an Unsplash API instance
const unsplash = createApi({
    accessKey: config.get('APPLICATION_ID'),
    /* APPLICATION_ID is loaded from universal-config (from config/server.js) */
});

const app = express();

// Define an API route
app.get('/api/photos', (req, res) => { // Frontend makes a request to this route
    // Call Unsplash API to fetch images
    unsplash.photos.list(
            { 
              // Get values from URL (E.g. /api/photos?start=1)
              page: req.query.start, //  Current page number (default: 1)
              perPage: req.query.count // Number of images per page (default: 30)
            }
        ) 
        .then(result => { // Send response back to frontend
            console.log("Unsplash API Response:", result) // Log full response
            res.json(result.response); //  Contains image data
        })
        .catch(error => { // Handle errors properly
            // If there's an error, log it and send a 500 error back
            console.error("Unsplash API Error:", error);
            res.status(500).json({ error: error.message });
        });
});

const PORT = process.env.PORT || 5000;   

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));