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
    name: '',
    number: '',
    filter: '',
  };
  handlerChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
  handlerSubmit = evt => {
    evt.preventDefault();

    const result = this.state.contacts.map(({ name }) => name);
    if (!result.includes(this.state.name)) {
      this.setState(prev => ({
        contacts: [
          ...prev.contacts,
          { name: prev.name, number: prev.number, id: nanoid() },
        ],
        name: '',
        number: '',
      }));
    } else {
      return alert(`${this.state.name} is already in contacts`);
    }
  };
  filterChange = evt => {
    this.setState({ filter: evt.target.value });
  };
  onDelete = ({ target: { id } }) => {
    const result = this.state.contacts.filter(user => user.id !== id);
    this.setState({ contacts: result });
  };
  onFilter = evt => {
    const filterResault = [...this.state.contacts];
    if (this.state.filter) {
      return filterResault.filter(
        user =>
          user.name.includes(this.state.filter) ||
          user.name.toLowerCase().includes(this.state.filter)
      );
    } else {
      return this.state.contacts;
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
          handlerSubmit={this.handlerSubmit}
          state={this.state}
          handlerChange={this.handlerChange}
        ></Form>

        <Filter
          filterChange={this.filterChange}
          filter={this.state.filter}
        ></Filter>
        <ListContact
          filter={this.state.filter}
          onFilter={this.onFilter}
          list={this.state.contacts}
          number={this.state.number}
          onDelete={this.onDelete}
        ></ListContact>
      </div>
    );
  }
}
