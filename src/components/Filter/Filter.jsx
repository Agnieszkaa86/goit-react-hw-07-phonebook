import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filterSlice';
import { getFilter } from 'redux/selectors';

import { Input, Label } from './Filter.styled';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  return (
    <Label>
      Find contacts by name
      <Input value={filter} type="text" onChange={handleChange} />
    </Label>
  );
};
