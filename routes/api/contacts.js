const express = require("express");
const router = express.Router();

const task = require("../../model/index");

router.get("/", async (req, res, next) => {
  res.json(task.listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const result = await task.getContactById(req.params.contactId);
  result ? res.json(result) : next();
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (name && email && phone) {
    const result = await task.addContact(req.body);
    res.status(201).json(result);
  }

  res.status(400).json({ message: "missing required name field" });
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await task.removeContact(req.params.contactId);
  result ? res.json({ message: "contact deleted" }) : next();
});

router.patch("/:contactId", async (req, res, next) => {
  if (!Object.entries(req.body).length) {
    res.status(400).json({ message: "missing fields" });
  }

  const result = await task.updateContact(req.params.contactId, req.body);

  result ? res.json(result) : next();
});

module.exports = router;
