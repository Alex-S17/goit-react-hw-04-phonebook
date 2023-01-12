import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { ContactsList } from "../ContactList/ContactList";
import { Form } from "../Form/Form";
import { Filter } from "../Filter/Filter";
import css from "./App.module.css";

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? '',
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
    
  const handleFormData = (newName, newNumber) => {
    const arrayOfNames = contacts.map(contact => contact.name);
    const nameToLowerCase = newName.toLowerCase();
    const nameIsPresent = arrayOfNames.find(element => element.toLowerCase() === nameToLowerCase);
    if (!nameIsPresent) {
      const newContact = {
        id: nanoid(),
        name: newName,
        number: newNumber,
      };      
      setContacts([...contacts, newContact],);
      return true;
    };
    return alert(`${newName} is already in contacts`);        
  };
  
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  
  const filterContacts = () => {
    const filterToLowerCase = filter.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  const deleteContact = (id) => {
    setContacts(prevState => (
      prevState.filter(contact => contact.id !== id)),
    );
  };
 
  const filteredContacts = filterContacts();
  
  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <Form onSubmit={handleFormData} />
      <h1>Contacts</h1>
      <div className={css.contactsWrapper}>
        <Filter
          filter={filter}
          onChange={changeFilter}
        />
        <ContactsList
          arrayOfContacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
};






  // ALTERNATIVE VARIANT OF componentDidMount()
// componentDidMount() {
  //   const contactsJSON = localStorage.getItem('contacts');
  //   console.log(contactsJSON);
  //   const parsedContacts = JSON.parse(contactsJSON);
  //   console.log(parsedContacts);

  //   if (!contactsJSON || contactsJSON.length === 0) {
  //     this.setState({
  //       contacts: [
  //         { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //         { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //         { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //         { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //       ],
  //     });
  //   }
      
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts, });
  //   }      
  // };

