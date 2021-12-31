const router = require("express").Router();
const worksCtrl = require("../controllers/works");

router.get("/", worksCtrl.getWorks);
router.get("/:work_id", worksCtrl.getWork);
router.patch("/:work_id", worksCtrl.updateWork);
router.delete("/:work_id", worksCtrl.deleteWork);

module.exports = router;
