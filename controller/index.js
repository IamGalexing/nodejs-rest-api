const service = require("../services/fetch");
const validation = require("../services/validation");

const getAll = async (req, res, next) => {
  try {
    const result = await service.getAllContacts();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await service.getContactById(req.params.contactId);
    result ? res.json(result) : next();
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const add = async (req, res, next) => {
  //   const { error } = validation.addContact.validate(req.body);
  //   if (error) {
  //     res.status(400).json({ message: "missing required name field" });
  //     return;
  //   }
  try {
    const result = await service.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const update = async (req, res, next) => {
  //   const { error } = validation.updateContact.validate(req.body);
  //   if (error) {
  //     res.status(400).json({ message: "missing fields" });
  //     return;
  //   }
  try {
    const result = await service.updateContact(req.params.contactId, req.body);
    result ? res.json(result) : next();
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  const { error } = validation.updateStatus.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }
  try {
    const result = await service.updateContact(req.params.contactId, {
      favorite: req.body.favorite,
    });
    result ? res.json(result) : next();
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await service.removeContact(req.params.contactId);
    result ? res.json({ message: "contact deleted" }) : next();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
  updateStatus,
};
