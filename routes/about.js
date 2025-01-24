const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get team members
 *     description: Retrieves a list of team members with their first and last names.
 *     responses:
 *       200:
 *         description: Successfully retrieved team members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                     example: Nir
 *                   last_name:
 *                     type: string
 *                     example: Haroush
 */

/**
 * Retrieves a list of team members.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
router.get('/', (req, res) => {
    const team = [
        { first_name: "Nir", last_name: "Haroush" },
        { first_name: "Dor", last_name: "Mitnik" }
    ];
    res.json(team);
});

module.exports = router;
