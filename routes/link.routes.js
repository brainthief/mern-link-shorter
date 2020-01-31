const { Router } = require("express");
const Link = require("../modules/Link");
const router = Router();

router.post("/generate", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: "Something was wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const link = await Link.find({ owner: null });
  } catch (e) {
    res.status(500).json({ message: "Something was wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
  } catch (e) {
    res.status(500).json({ message: "Something was wrong" });
  }
});
module.exports = router;
