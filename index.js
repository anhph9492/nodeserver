// index.js
const express = require('express')
const app = express()
const PORT = 4000

const redis = require('redis');


const client = redis.createClient({
  password: 'mRY81VkGg3AHJe4EBMhdD7axWLQqy0Dk',
  socket: {
      host: 'redis-19558.c1.asia-northeast1-1.gce.cloud.redislabs.com',
      port: 19558
  }
});
client.on('error', err => console.log('Redis Client Error', err));

// const connectRedis = async () => {
//   await client.connect()
//   await client.set('foo', 'bar');
// const value = await client.get('foo');
// console.log(value) // returns 'bar'

// await client.disconnect();

// }
// connectRedis()

client.connect()
.then(res => {
  console.log('redis connection successfully - ')
})
.catch(err => {
  console.log('redis connection falure - ')
});


app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app