const express = require("express");
const router = express.Router();
const importController = require("../controllers/importers");
const auth = require("../middleware/auth-old");

// Gettting all importers
router.get("/", auth, importController.getImporters);

//Creating importer
router.post("/", importController.addImporter);

// Getting ONE importer

router.get("/:clientId", importController.getImporter);

// Update an importer with clientId
router.put("/:clientId", importController.updateImporter);

router.get("/admin", importController.adminBoard);
router.get("/mod", importController.moderatorBoard);
module.exports = router;
