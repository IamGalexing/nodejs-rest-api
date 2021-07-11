const Contact = require('../schemas/contact')

const getAllContacts = async () => {
  return Contact.find()
}

const getContactById = async (id) => {
  return Contact.findOne({ _id: id })
}

const addContact = async (body) => {
  return Contact.create({ ...body })
}

const updateContact = async (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true })
}

const removeContact = async (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}
