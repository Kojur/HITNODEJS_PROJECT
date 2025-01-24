const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');
/**
 * @swagger
 * /api/report:
 *   get:
 *     summary: Get cost reports for a user
 *     description: Retrieves a user's cost records for a specific year and month.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year for the report
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: Month for the report (1-12)
 *     responses:
 *       200:
 *         description: Successfully retrieved cost records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                     example: Housing
 *                   description:
 *                     type: string
 *                     example: Rent Payment
 *                   amount:
 *                     type: number
 *                     example: 1200
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2024-02-01"
 *       404:
 *         description: No costs found for user and date range
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/add:
 *   post:
 *     summary: Add a new cost entry
 *     description: Creates a new cost record for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 example: 123
 *               category:
 *                 type: string
 *                 example: "Food"
 *               description:
 *                 type: string
 *                 example: "Lunch at a restaurant"
 *               amount:
 *                 type: number
 *                 example: 15.99
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-02-12"
 *     responses:
 *       201:
 *         description: Successfully created a cost entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65a123bcde7890fghijk1234"
 *                 userid:
 *                   type: integer
 *                   example: 123
 *                 category:
 *                   type: string
 *                   example: "Food"
 *                 description:
 *                   type: string
 *                   example: "Lunch at a restaurant"
 *                 amount:
 *                   type: number
 *                   example: 15.99
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-02-12"
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * Adds a new cost record.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
router.post('/add', async (req, res) => {
    try{
        console.log(req.body);
        const cost = new Cost(req.body);
        const savedCost = await cost.save();
        res.status(201).json(savedCost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
/**
 * Fetches cost reports for a user based on year and month.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
router.get('/report', async (req, res) => {
    try {
        const { id, year, month } = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const costs = await Cost.aggregate([
            {
                $match: {
                    userid: parseInt(id),
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    records: { $push: "$$ROOT" }
                }
            }
        ]);
        console.log(costs);
        if (!costs.length) {
            let error = new Error('Costs or User not found');
            res.status(404).json(error);
        } else {
            res.json(costs);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;