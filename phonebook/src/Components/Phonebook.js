const Header = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

const Contacts = ({ contacts }) => {
  return (
    <>
      {contacts.map((contact) => (
        <Entry key={contact.phone} contact={contact} />
      ))}
    </>
  );
};

const Entry = ({ contact }) => {
  const { name, phone } = contact;
  return (
    <>
      <p>
        Name: {name} &nbsp; Number: {phone}
      </p>
    </>
  );
};

const Phonebook = ({ phonebook }) => {
  const { name, contacts } = phonebook;

  return (
    <>
      <Header title={name} />
      <Contacts contacts={contacts} />
      <p>Total number of entries: {phonebook.contacts.length}</p>
    </>
  );
};

export default Phonebook