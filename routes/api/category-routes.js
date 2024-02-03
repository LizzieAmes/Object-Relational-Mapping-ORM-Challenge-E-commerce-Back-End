const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
  })
    .then(category => res.json(category))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(category => {
            if (!category[0]) {
                res.status(404).json({ message: 'No Category found with this id' });
                return;
            }
            res.json(category);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", (req, res) => {
  Product.update(
    { category_id: null },
    {
      where: { category_id: req.params.id },
    }
  )
    .then(() => {
      // delete a category by its `id` value
      Category.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((deleteResponse) => {
          if (deleteResponse) {
            res.status(200).json({ message: "Category deleted successfully" });
          } else {
            res.status(404).json({ message: "No category found with this ID" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});




module.exports = router;
