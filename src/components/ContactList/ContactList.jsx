import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectVisibleContacts,
  selectError,
} from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';
import { List, Item, Button } from './ContactList.styled';

export const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <p>Data is loading</p>}
      {error && <p>{error}</p>}
      <List>
        {contacts.length > 0 &&
          contacts.map(({ id, name, phone }) => {
            return (
              <Item key={id}>
                {name} : {phone}
                <Button onClick={() => dispatch(deleteContact(id))}>
                  Delete
                </Button>
              </Item>
            );
          })}
      </List>
    </>
  );
};
