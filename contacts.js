const { error } = require("console");
const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error("Eroare la citirea fisierului:", error);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts)
    
  });
}

 listContacts()

function addContact(name, email, phone) {
  if (!name && !email && !phone) {
    console.error("Trebuie sa completezi name,email,phone");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error("Eroare la citirea fisierului:", error);
      return;
    }

    const contacts = JSON.parse(data);
    const newContacts = {
      id: String(Date.now()),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContacts);

    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("Contactul a fost adaugat");
    });
  });
}

 

function getContactById(id) {
  const data = fs.readFileSync(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    console.table([contact]);
    return "Contactul a fost gasit";
  } else {
    return "Contactul nu a putut fi gasit";
  }
}

 

function removeContact(contactId) {
  const data = fs.readFileSync(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts.splice(index, 1);

    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));

    return "Contactul a fost șters";
  } else {
    return "Contactul nu a putut fi găsit";
  }
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
