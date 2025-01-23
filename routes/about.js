const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const team = [
        {
            first_name: "Nir",
            last_name: "Haroush"
        },
        {
            first_name: "Dor",
            last_name: "Mitnik"
        }
    ];

    res.render("about",{team:team});
});

module.exports = router;