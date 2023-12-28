import React, { useState } from 'react';
import { SearchHeader, Form, SearchButton, Input } from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <SearchHeader>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchIcon />
        </SearchButton>

        <Input
          onChange={handleChange}
          value={inputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </Form>
    </SearchHeader>
  );
};
