import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from '../../redux/contactSlice';
import { Form, Input, Label, Button } from './ContactForm.styled';

export const ContactForm = () => {
  const [name, setName] = useState('');

  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === event.target.name.value.toLowerCase()
      )
    ) {
      alert('There is a contact with this name');
      resetForm();
      return;
    }
    dispatch(addContact({ name, number, id: nanoid() }));
    alert('Contact added to phonebook');
    resetForm();
  };

  const inputChange = event => {
    const { value, name } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        alert('Error happened. Please try again');
        break;
    }
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={inputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={inputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};
