import { Component } from 'react';
import Form from './Form/Form';
import ListContact from './ListContact/ListContact';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  filterChange = evt => {
    this.setState({ filter: evt.target.value });
  };
  onDelete = ({ target: { id } }) => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(user => user.id !== id),
    }));
  };
  onFilter = evt => {
    return this.state.contacts.filter(
      user =>
        user.name.includes(this.state.filter) ||
        user.name.toLowerCase().includes(this.state.filter)
    );
  };
  addContact = info => {
    const result = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === info.name.toLowerCase()
    );
    if (!result) {
      const contact = {
        id: nanoid(),
        name: info.name,
        number: info.number,
      };
      this.setState(prev => ({
        contacts: [...prev.contacts, contact],
      }));
    } else {
      return alert(`${info.name} is already in contacts`);
    }
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Form
          contacts={this.state.contacts}
          addContact={this.addContact}
        ></Form>

        <Filter
          filterChange={this.filterChange}
          filter={this.state.filter}
        ></Filter>
        <ListContact
          productFilter={this.onFilter()}
          onDelete={this.onDelete}
        ></ListContact>
      </div>
    );
  }
}
