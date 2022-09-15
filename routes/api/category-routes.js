const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const allCategoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });

    return res.status(200).json(allCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });

    if (!singleCategoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("check");
  try {
    const createCategoryData = await Category.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(createCategoryData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    // 200 status code means the request is successful
    res.status(200).json(updateCategoryData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!destroyCategoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(destroyCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
