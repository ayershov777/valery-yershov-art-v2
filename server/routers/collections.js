const router = require("express").Router();
const collectionsCtrl = require("../controllers/collections");

router.get("/", collectionsCtrl.getCollections);
router.get("/:collection_id", collectionsCtrl.getCollection);
router.post("/", collectionsCtrl.addCollection);
router.patch("/:collection_id", collectionsCtrl.updateCollection);
router.delete("/:collection_id", collectionsCtrl.deleteCollection);

router.post("/:collection_id/works", collectionsCtrl.addWorkToCollection);
router.delete("/:collection_id/works", collectionsCtrl.removeWorkFromCollection);

module.exports = router;
