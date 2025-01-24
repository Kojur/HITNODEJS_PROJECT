const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/:userid', async function(req, res, next) {
  console.log(req.params);
  try {
    const userId = parseInt(req.params.userid);
    const user = await User.findOne({id: userId});
    if (!user) {
      let error = new Error('User not found');
      res.status(404).json(error);
    }
    else {
      const user_json = {'id': userId, 'first_name': user.first_name, 'last_name': user.last_name, 'total': user.total};
      res.json(user_json);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
