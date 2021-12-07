import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ children }) {
  const isModalOpen = useSelector(contactsSelectors.isModalOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(contactsOperations.closeModal());
    dispatch(contactsOperations.clearEditContactId());
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        onSubmit={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
