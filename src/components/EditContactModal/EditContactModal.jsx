import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { Button, TextField } from '@material-ui/core';
import styles from './EditContactModal.module.css';

export default function EditContact({ buttonTitle }) {
  const contactId = useSelector(contactsSelectors.editContactId);
  const contacts = useSelector(contactsSelectors.getContacts);
  const contact = contacts.find(contact => contact._id === contactId);

  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const isButtonDisable = name === '' || number === '';
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      contactId: contactId,
      contact: {
        name: name,
        number: number,
      },
    };

    dispatch(contactsOperations.DB_updateContactById(data));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form
        className={styles.contactForm}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={styles.name}
          onChange={handleChange}
          name="name"
          type="text"
          value={name}
          size="small"
          label="Name"
          variant="outlined"
        />

        <TextField
          className={styles.number}
          onChange={handleChange}
          name="number"
          type="tel"
          value={number}
          size="small"
          label="Number"
          variant="outlined"
        />
        <Button
          className={styles.editButton}
          disabled={isButtonDisable}
          type="submit"
          size="small"
          variant="contained"
        >
          {buttonTitle}
        </Button>
      </form>
    </>
  );
}
