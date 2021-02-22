const express = require('express');
const ExpressError = require('./expressError');
const itemsRoutes = require('./itemsRoutes');

app = express()

app.use(express.json())

app.use("/items", itemsRoutes);

app.use(function (req, res, next) {
    notFoundError = new ExpressError("Page not found", 404)
    next(notFoundError)
})

app.use(function (err, req, res, next) {
    const status = err.status;
    const message = err.message;
    res.status(status).json({ error: { message, status } })
})

module.exports = app;