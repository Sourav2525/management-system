const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json({ status: 'This is the User Api Microservice' });
});

router.use('/roles', require('./roles.routes'));

module.exports = router;
