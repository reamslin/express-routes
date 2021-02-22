const express = require("express");
const router = new express.Router();
const items = require('./fakeDb');
const middleware = require('./middleware')

router.get('/', function (req, res, next) {
    res.json(items)
})

router.post('/', function (req, res, next) {
    const name = req.body.name;
    const price = req.body.price;
    const item = { name, price };

    items.push(item);

    res.status(201).json({ "added": item })
})

router.get('/:name', middleware.findItem, function (req, res, next) {
    res.json(req.item);

})

router.patch('/:name', middleware.findItem, function (req, res, next) {
    const newName = req.body.name;
    const newPrice = req.body.price;

    const newItem = { name: newName || req.item.name, price: newPrice || req.item.price }
    items[req.itemIndex] = newItem;

    res.json({ 'updated': newItem });
})

router.delete('/:name', middleware.findItem, function (req, res, next) {
    items.splice(req.itemIndex, 1)

    res.json({ message: "deleted" })
})






module.exports = router;
