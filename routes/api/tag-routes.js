const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  console.log("check");
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });

    return res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });

    if (!singleTagData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const createTagData = await Tag.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(createTagData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    // 200 status code means the request is successful
    res.status(200).json(updateTagData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!destroyTagData) {
      res.status(404).json({ message: "No Tag found with that id!" });
      return;
    }

    res.status(200).json(destroyTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
