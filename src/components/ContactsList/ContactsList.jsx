import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsSelectors, contactsOperations } from 'redux/contacts';
import { authSelectors } from 'redux/auth';
import IconButton from '@material-ui/core/IconButton';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import styles from './ContactsList.module.css';

import BasicModal from '../BasicModal/BasicModal';
import EditContact from 'components/EditContactModal/EditContactModal';

export default function ContactsList() {
  const filteredContacts = useSelector(contactsSelectors.getFilteredContacts);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const error = useSelector(contactsSelectors.error);
  const dispatch = useDispatch();

  const handleOpen = async e => {
    const contactId = e.currentTarget.getAttribute('contactid');
    await dispatch(contactsOperations.getEditContactId(contactId));
    dispatch(contactsOperations.openModal());
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(contactsOperations.DB_fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  async function deleteItem(id) {
    dispatch(contactsOperations.DB_deleteContact(id));
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
                  className={styles.editButton}
                  aria-label="edit"
                  size="small"
                  onClick={handleOpen}
                  contactid={contact._id}
                >
                  <EditTwoToneIcon />
                </IconButton>

                <IconButton
                  className={styles.deleteButton}
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
      <BasicModal>
        <EditContact buttonTitle="Edit contact" />
      </BasicModal>
    </>
  );
}
