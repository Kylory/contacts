import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { contactsOperations } from 'redux/contacts';

const contactsReducer = createReducer([], {
  [contactsOperations.DB_fetchContacts.fulfilled]: (_, { payload }) => payload,
  [contactsOperations.DB_postContact.fulfilled]: (state, { payload }) => [
    ...state,
    payload,
  ],

  [contactsOperations.DB_deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(contact => contact._id !== payload),

  [contactsOperations.DB_updateContactById.fulfilled]: (state, { payload }) => {
    const contactIndex = state.findIndex(
      contact => contact._id === payload._id,
    );
    const updatedState = [...state];
    updatedState.splice(contactIndex, 1, payload);
    return updatedState;
  },
});

const filterReducer = createReducer('', {
  [contactsOperations.filterContacts]: (_, { payload }) => payload,
});

const errorReducer = createReducer(null, {
  [contactsOperations.DB_fetchContacts.rejected]: (_, { payload }) => payload,
  [contactsOperations.DB_fetchContacts.pending]: () => null,

  [contactsOperations.DB_postContact.rejected]: (_, { payload }) => payload,
  [contactsOperations.DB_postContact.pending]: () => null,

  [contactsOperations.DB_deleteContact.rejected]: (_, { payload }) => payload,
  [contactsOperations.DB_deleteContact.pending]: () => null,
});

const isModalOpenReducer = createReducer(false, {
  [contactsOperations.openModal]: () => true,
  [contactsOperations.closeModal]: () => false,
});

const editContactIdReducer = createReducer(null, {
  [contactsOperations.getEditContactId.fulfilled]: (_, { payload }) => payload,
  [contactsOperations.clearEditContactId]: () => null,
});

export const rootReducer = combineReducers({
  contactsList: contactsReducer,
  filter: filterReducer,
  error: errorReducer,
  isModalOpen: isModalOpenReducer,
  editContactId: editContactIdReducer,
});
