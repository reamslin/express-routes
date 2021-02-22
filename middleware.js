const ExpressError = require('./expressError');

function findItem(req, res, next) {
    try {
        const name = req.params.name;
        const itemIndex = items.findIndex(i => i.name === name);
        if (itemIndex === -1) {
            throw new ExpressError("Item not Found", 404)
        }
        const item = items[itemIndex];
        req.item = item;
        req.itemIndex = itemIndex;
        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = { findItem }