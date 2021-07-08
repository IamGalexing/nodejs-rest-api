const express = require("express");
const router = express.Router();
const task = require("../../controller");

// const validation = require("../../services/validation");

router.get("/", task.getAll);

router.get("/:contactId", task.getById);

router.post("/", task.add);

router.patch("/:contactId", task.update);

router.patch("/:contactId/favorite", task.updateStatus);

router.delete("/:contactId", task.remove);

module.exports = router;
