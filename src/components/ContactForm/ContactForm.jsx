import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { contactsOperations } from 'redux/contacts';
import { Button, TextField } from '@material-ui/core';
import styles from './ContactForm.module.css';

export default function ContactForm({ buttonTitle }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const isButtonDisable = name === '' || number === '';

  const dispatch = useDispatch();

  const addContact = async () => {
    await dispatch(
      contactsOperations.DB_postContact({
        name: name,
        number: number,
      }),
    );
    dispatch(contactsOperations.DB_fetchContacts());
  };

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

  const handleSubmit = e => {
    e.preventDefault();

    addContact();
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
          className={styles.button}
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
