import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from '../../redux/contactSlice';
import { List, Item, Button } from './ContactList.styled';

const getVisibleContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const filteredContacts = getVisibleContacts(contacts, filter);

  return (
    <List>
      {contacts.length > 0 ? (
        filteredContacts.map(({ id, name, number }) => {
          return (
            <Item key={id}>
              {name} : {number}
              <Button onClick={() => dispatch(deleteContact(id))}>
                Delete
              </Button>
            </Item>
          );
        })
      ) : (
        <p>There are no contacts</p>
      )}
    </List>
  );
};
