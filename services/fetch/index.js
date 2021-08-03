const Contact = require('../schemas/contact')
const User = require('../schemas/user')

const getContacts = async (userId, query = {}) => {
  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    { ...query, owner: userId },
    {}
  )
  return { contacts, total }
}

const getContactById = async (userId, id) => {
  return Contact.findOne({ _id: id, owner: userId })
}

const addContact = async (userId, body) => {
  return Contact.create({ ...body, owner: userId })
}

const updateContact = async (userId, id, body) => {
  return Contact.findByIdAndUpdate({ _id: id, owner: userId }, body, {
    new: true,
  })
}
const removeContact = async (userId, id) => {
  return Contact.findByIdAndRemove({ _id: id, owner: userId })
}

const findUser = async (filter) => {
  return User.findOne(filter)
}

const addNewUser = ({ email, password, verifyToken }) => {
  const newUser = new User({ email, verifyToken })
  newUser.setPassword(password)
  return newUser.save()
}

const updateUserById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo, { new: true })
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  findUser,
  addNewUser,
  updateUserById,
}
