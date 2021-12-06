import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsSelectors, contactsOperations } from 'redux/contacts';
import { authSelectors } from 'redux/auth';
import IconButton from '@material-ui/core/IconButton';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import styles from './ContactsList.module.css';

export default function ContactsList() {
  const filteredContacts = useSelector(contactsSelectors.getFilteredContacts);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const error = useSelector(contactsSelectors.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(contactsOperations.DB_fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  async function deleteItem(id) {
    await dispatch(contactsOperations.DB_deleteContact(id));
    dispatch(contactsOperations.DB_fetchContacts());
  }

  return (
    <>
      {error ? (
        <div className={styles.error}>{error.message}, no conection to DB</div>
      ) : (
        <ul className={styles.ContactsList}>
          {filteredContacts &&
            filteredContacts.map(contact => (
              <li key={contact._id}>
                {contact.name}
                {': '}
                {contact.number}
                <IconButton
                  className={styles.button}
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    deleteItem(contact._id);
                  }}
                >
                  <CancelTwoToneIcon />
                </IconButton>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
