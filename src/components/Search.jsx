import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { SearchIcon } from './Icons';

const Wrapper = styled.div`
  display: flex;
  height: 32px;

  .input-box {
    max-width: 650px;
    padding: 2px 6px;
    border: 1px solid #ccc;
    border-right: none;
  }
  input {
    border: none;
    max-width: 500px;
    min-width: 250px;
    width: 30vw;
  }
  button {
    width: 65px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border: 1px solid #d3d3d3;
    background-color: #f8f8f8;
    cursor: pointer;
  }
  button:hover {
    background-color: #f0f0f0;
    svg {
      fill: ${(props) => props.theme.primaryColor};
    }
  }
`;

const Search = () => {
  const search = useInput('');
  const history = useHistory();

  const handlerSearch = (e) => {
    if (e.keyCode === 13) {
      if (search.value.trim()) {
        history.push(`search/${search.value}`);
        search.value = '';
      }
    }
  };

  return (
    <Wrapper>
      <div className="input-box">
        <input
          placeholder="Search"
          type="text"
          value={search.value}
          onChange={search.onChange}
          onKeyDown={handlerSearch}
        />
      </div>
      <button type="button" onClick={handlerSearch}>
        <SearchIcon />
      </button>
    </Wrapper>
  );
};

export default Search;
