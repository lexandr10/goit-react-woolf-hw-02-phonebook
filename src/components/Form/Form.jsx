import css from './form.module.css';
import { nanoid } from 'nanoid';
const { Component } = require('react');

class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  handlerChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
  handlerSubmit = evt => {
    evt.preventDefault();

    const result = this.props.contacts.find(
      ({ name }) => name.toLowerCase() === this.state.name.toLowerCase()
    );
    if (!result) {
      const contact = {
        id: nanoid(),
        name: this.state.name,
        number: this.state.number,
      };
      this.props.addContact(contact);
      this.setState({ name: '', number: '' });
    } else {
      return alert(`${this.state.name} is already in contacts`);
    }
  };
  render() {
    return (
      <div className="">
        <h1 className={css.title}>Phonebook</h1>
        <form className={css.form} onSubmit={this.handlerSubmit}>
          <div className={css.blockImputs}>
            <div className={css.divInput}>
              <label className={css.label} htmlFor="222">
                Name
              </label>
              <input
                className={css.input}
                type="text"
                name="name"
                id="222"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={this.state.name}
                onChange={this.handlerChange}
              />
            </div>
            <div className={css.divInput}>
              {' '}
              <label className={css.label} htmlFor="223">
                Number
              </label>
              <input
                className={css.input}
                id="223"
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={this.state.number}
                onChange={this.handlerChange}
              />
            </div>
          </div>

          <button className={css.buttonx} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
/*  */
//
