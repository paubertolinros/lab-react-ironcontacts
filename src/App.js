import React from 'react';
import './App.css';
import contactList from './contacts.json';
import { useState } from "react";


function App() {
  const [contacts, setContacts] = useState(contactList.slice(0,5));
  const handleAddRandomContact = () => {
    const randomContact = contactList[Math.floor(Math.random() * contactList.length)]
    if (!contacts.includes(randomContact)) {
      setContacts([...contacts, randomContact])
      //QUESTION: perquè no funciona si poso contacts sense l'spread?
      //Perquè em quedi clar, ho passo tot dins de [ ] perquè sinó
      //no podria fer el map, no?
    }
  };

  const handleSortByName = () => {
    const sortByName = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    console.log(sortByName)
    setContacts(sortByName)
  }

  const handleSortPopularity = () => {
    const sortByPopularity = [...contacts].sort((a, b) => a.popularity - b.popularity);
    setContacts(sortByPopularity)
  }

  const handleDeleteContact = (contactId) => {
    const filterContacts = contacts.filter(elem => {
      return elem.id !== contactId
    });
    setContacts(filterContacts)
  }

  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <button className="button-random-contact" onClick={handleAddRandomContact}> Add Random Contact </button>
      <button className="button-random-contact" onClick={handleSortByName}> Sort by Name </button>
      <button className="button-random-contact" onClick={handleSortPopularity}> Sort by Popularity </button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>  
        </thead>
        <tbody>
        {contacts.map(elem => {
          return (
        <tr key={elem.id}>
          <td><img className="contact-photo" src={elem.pictureUrl} alt="{elem.name}"/></td>
          <td>{elem.name}</td>
          <td>{elem.popularity.toFixed(2)}</td>
          <td>{elem.wonOscar ? "🏆" : null}</td>
          <td>{elem.wonEmmy ? "🏆" : null}</td>  
          <td><button className="button-random-contact" onClick={() => handleDeleteContact(elem.id)}> Delete </button></td>    
        </tr>
            )
        })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
