const express = require('express');

const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  // console.log('Request: ', req)
  // console.log('Response: ', res)
  console.log('Time: ', Date.now());
  next();
};
router.use(timeLog);

// define the home page route
router.get('/', (req, res) => {
  res.send('GET /book');
});
// define the about route
router.post('/', (req, res) => {
  res.send('POST /book');
});

module.exports = router;
