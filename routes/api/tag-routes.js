const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag
      }
    ]
  })
  .then(tags => res.json(tags))
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

// GET a single tag by its ID
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag
      }
    ]
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
    }
    res.json(tag);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

// POST a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tag => res.json(tag))
  .catch(err => {
    console.error(err);
    res.status(400).json(err);
  });
});

// PUT to update a tag's name by its ID
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tag => {
    if (!tag[0]) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
    }
    res.json({ message: 'Tag Updated' });
  })
  .catch(err => {
    console.error(err);
    res.status(400).json(err);
  });
});

// DELETE a tag by its ID
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedRows => {
    if (deletedRows === 0) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
    }
    res.json({ message: 'Tag Deleted' });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

module.exports = router;