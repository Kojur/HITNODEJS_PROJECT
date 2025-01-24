const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');

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