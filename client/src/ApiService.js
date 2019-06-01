import fetch from 'node-fetch';

const url = 'http://localhost:3000/api';
const urlRestaurants = 'http://localhost:3000/api/restaurants'
const urlPhoto = 'http://localhost:3000/api/photos'
class ApiService {
    // get api
    static getApi() {
        return new Promise(async (resolve, reject) => {
            try {
                const fetchResponse = await fetch(url);
                const preData = await fetchResponse.json();
                const data = await preData;
                console.log(data)
                resolve(
                    data
                );
            } catch(err) {
                reject(err);
            }
        })
    }
    // post api
    static postPlaces(location) {
        return new Promise(async (resolve, reject) => {
            try {
                var options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(location)
                }
                console.log(options);
                const fetchResponse = await fetch(urlRestaurants, options);
                const preData = await fetchResponse.json();
                const data = await preData;
                console.log(data);
                resolve(data);
            } catch(err) {
                reject(err);
            }
        })         
    }
    // post photo
    static postPhoto(photo) {
        return new Promise(async (resolve, reject) => {
            try {
                var options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({req: photo})
                }
                console.log(options);
                const fetchResponse = await fetch(urlPhoto, options);
                const preData = await fetchResponse.json();
                const data = await preData;
                console.log(data);
                resolve(data);
            } catch(err) {
                reject(err);
            }
        })         
    }
    // delete api
}

export default ApiService;