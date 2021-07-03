const fs = require('fs/promises')
const path = require('path')
const contacts = require('./contacts.json')

const contactPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    return await contacts
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const result = await contacts.find((contact) => +contact.id === +contactId)
    return result
  } catch (error) {
    console.log(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const filtered = contacts.filter((contact) => +contact.id !== +contactId)

    if (contacts.length === filtered.length) return false

    await fs.writeFile(contactPath, JSON.stringify(filtered, null, 2))
    return true
  } catch (error) {
    console.log(error.message)
  }
}

const addContact = async (body) => {
  try {
    const newID = contacts.length ? contacts[contacts.length - 1].id + 1 : 1
    const newContact = {
      id: newID,
      ...body,
    }

    contacts.push(newContact)
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return contacts
  } catch (error) {
    return error.message
  }
}

const updateContact = async (contactId, body) => {
  try {
    const toUpdate = await contacts.find(
      (contact) => +contact.id === +contactId
    )
    if (!toUpdate) return false

    for (const key in body) {
      toUpdate[key] = body[key]
    }

    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return toUpdate
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
