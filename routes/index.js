const express = require('express');
const router = express.Router();

/* GET home page (API root). */
router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to the Expense Manager API!",
    endpoints: {
      users: "/api/users/:userid",
      costs: "/api/report?id=:userid&year=:year&month=:month",
      about: "/api/about"
    }
  });
});

module.exports = router;
