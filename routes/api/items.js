const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// GET api/items
// Get all Items
// Public

router.get('/', (req, res) => {
   Item.find()
      .sort({ date: -1 })
      .then((items) => res.json(items));
});

// POST api/items
// Create an Item
// Private

router.post('/', auth, (req, res) => {
   const newItem = new Item({
      name: req.body.name,
   });

   newItem.save().then((item) => res.json(item));
});

// DELETE api/items
// Delete an Item
// Private

router.delete('/:id', auth, (req, res) => {
   Item.findById(req.params.id)
      .then((item) => item.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
