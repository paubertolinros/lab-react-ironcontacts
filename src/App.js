import React from 'react';
import './App.css';
import contactList from './contacts.json';
import { useState } from "react";


function App() {
  const [contacts, setContacts] = useState(contactList.slice(0,5));
  const handleAddRandomContact = () => {
    const randomContact = contactList[Math.floor(Math.random() * contactList.length)]
    let newListContacts= [...contacts]
    if (!contacts.includes(randomContact)) {
      //const newContacts = [...contacts, randomContact];
      newListContacts.push(randomContact)
      setContacts(newListContacts);
      //QUESTION: perquè no funciona si poso contacts sense l'spread? (línia 11 o 13)
      // és perquè només setContacts pot modificar lestat contacts? és a dir, tot i que no
      //utlitzi un mètode que modifiqui l'array original, si la modifico jo amb un
      //push o amb una col·lecció indexada, haig de fer servir l'spread per fer una còpia? 
      //És que no sé si ho acabo d'entendre...
      //Perquè em quedi clar, ho passo tot dins de [ ] perquè sinó
      //no podria fer el map, no? (línia 13)
    }
  };

  const handleSortByName = () => {
    const sortByName = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sortByName)
  }

  const handleSortPopularity = () => {
    const sortByPopularity = [...contacts].sort((a, b) => a.popularity - b.popularity);
    setContacts(sortByPopularity)
  }

  // const handleDeleteContact = (contactId) => {
  //   const filterContacts = contacts.filter(elem => {
  //     return elem.id !== contactId
  //   });
  //   setContacts(filterContacts)
  // }

  const handleDeleteContact = (contactId) => {
    let newContactsList = [...contacts]
    const filterContacts = newContactsList.findIndex(elem => elem.id === contactId);
    newContactsList.splice(filterContacts, 1); 
    setContacts(newContactsList)
  }

  return (
    <div className="App">
      <section className="i-c-section">
        <h1>Iron Contacts</h1>
        <section className="buttons-section">
          <button className="button-random-contact" onClick={handleAddRandomContact}> Add Random Contact </button>
          <button className="button-random-contact" onClick={handleSortByName}> Sort by Name </button>
          <button className="button-random-contact" onClick={handleSortPopularity}> Sort by Popularity </button>
        </section>
        <section>
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
              {/* <td>{elem.wonOscar ? "🏆" : null}</td> */}
              {elem.wonOscar ? <td className="won">★</td> : <td></td>} 
              {/* <td>{elem.wonEmmy ? "🏆" : null}</td> */}
              {elem.wonEmmy ? <td className="won">★</td> : <td></td>} 
              <td><button className="button-random-contact" onClick={() => handleDeleteContact(elem.id)}> Delete </button></td>    
            </tr>
                )
            })}
            </tbody>
          </table>
        </section>
      </section>
    </div>
  );
}

export default App;
