const express = require('express');
const mongodb = require('mongodb');
const fetch = require('node-fetch');
require('dotenv').config()

const router = express.Router();
const API_KEY = process.env.API_KEY;

// Get request
router.get('/', async (req,res) => {
    const api = await loadDB();
    res.send(await api.find({}).toArray());
});

// Post request
router.post('/restaurants', function(request, response) {
    const data = request.body;
    const timestamp = Date.now();
    const location = {
        latitude: data.latitude,
        longitude: data.longitude
    }
    const radius = data.radius;
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=restaurant&key=${API_KEY}`;
    
    async function getRestaurant() {
        let fetchResponse = await fetch(url)
        let fetchData = await fetchResponse.json()
        return fetchData
    }
    getRestaurant().then(function(res) {
        response.json({
            status: 'success',
            timestamp: timestamp,
            location: location,
            radius : radius,
            result: res
        });
    });
    
});
router.post('/photos', function(request, response) {
    const data = request.body;
    let photoreference = data.req;
    let photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${API_KEY}`;
    async function getPhoto() {
        let fetchResponse = await fetch(photoUrl)
        let fetchData = await fetchResponse.url;

        return fetchData
    }
    getPhoto().then(function(res) {
        console.log(res)
        response.json({
            status: 'success',
            photo: res
        });
    });
});
// Delete entry
router.delete('/:id', async (req,res) => {
    const api = await loadDB();
    await api.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})
async function loadDB() {
    const client = await mongodb.MongoClient.connect
    (process.env.MONGO_DB, {
        useNewUrlParser: true
    })
    return client.db('restaurants').collection('api');
}

module.exports = router;