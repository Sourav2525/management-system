const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json({ status: 'This is the User Api Microservice' });
});

router.use('/departments', require('./departments-routes'));

module.exports = router;
