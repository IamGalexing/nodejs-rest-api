const fs = require("fs/promises");
const path = require("path");
const contacts = require("./contacts.json");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = () => {
  return contacts;
};

const getContactById = (contactId) => {
  const result = contacts.find((contact) => +contact.id === +contactId);
  // const result = find || { message: "Not found" };
  return result;
};

const removeContact = async (contactId) => {
  try {
    const filtered = contacts.filter((contact) => +contact.id !== +contactId);

    if (contacts.length === filtered.length) return false;

    await fs.writeFile(contactPath, JSON.stringify(filtered, null, 2));
    return true;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (body) => {
  try {
    const newID = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
    const newContact = {
      id: newID,
      ...body,
    };

    contacts.push(newContact);

    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const toUpdate = contacts.find((contact) => +contact.id === +contactId);
    if (!toUpdate) throw new Error();

    for (const key in body) {
      if (key !== "id") {
        toUpdate[key] = body[key];
      }
    }

    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return toUpdate;
  } catch {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
