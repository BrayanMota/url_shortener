const express = require("express");
const router = express.Router();
const URL = require("../models/url");

// 1. Encurtar uma URL
router.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = Math.random().toString(36).substr(2, 6); // Gera um código curto
    const newUrl = new URL({ originalUrl, shortUrl });
    await newUrl.save();
    res.json({ originalUrl, shortUrl });
});

// 2. Buscar URL por ID
router.get("/id/:id", async (req, res) => {
    const url = await URL.findById(req.params.id);
    res.json(url || { error: "URL não encontrada" });
});

// 3. Listar URLs por data
router.get("/date/:date", async (req, res) => {
    const date = new Date(req.params.date);
    const urls = await URL.find({
        createdAt: { $gte: date, $lt: new Date(date).setDate(date.getDate() + 1) },
    });
    res.json(urls);
});

// 4. Buscar URL original pelo código curto
router.get("/short/:shortUrl", async (req, res) => {
    const url = await URL.findOne({ shortUrl: req.params.shortUrl });
    res.json(url || { error: "URL não encontrada" });
});

module.exports = router;
