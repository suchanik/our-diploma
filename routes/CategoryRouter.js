const express = require('express');
const router = express.Router();

const categoryRouter = require("../service/CategoryService");

router.get('/', async (req, res) => {
    const categories = await categoryRouter.getAllCategories();

    res.render("categoryPage", {
        title: "Epapu",
        categories
    })
});

module.exports = router