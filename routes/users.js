const express = require('express');
const User = require('../models/user');

const router = express.Router();
/**
 * @swagger
 * /api/users/{userid}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetches user details including first name, last name, and total expenses.
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 first_name:
 *                   type: string
 *                   example: John
 *                 last_name:
 *                   type: string
 *                   example: Doe
 *                 total:
 *                   type: number
 *                   example: 500.75
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * Retrieves a user by ID.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {void}
 */
router.get('/:userid', async function(req, res, next) {
  try {
    const userId = parseInt(req.params.userid);
    const user = await User.findOne({id: userId});
    if (!user) {
      res.status(404).json({err: "User not found"});
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
