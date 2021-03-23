import { useState, useEffect, useCallback, useRef } from 'react';
import { getPeople } from '@/services';
import { List } from 'immutable';
import debounce from 'lodash/debounce';
import { useLazyQuery } from '@apollo/client';
import { SearchAuthorName, SearchAuthorNameByAll } from '@/services/query';
import PersonItem from '@/components/PersonItem';
import { StyledPeople } from './style.js';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';
import Spinner from '@/../public/img/spinner.gif';

export default function PeoplePage() {
  const [people, setPeople] = useState(List());
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [suggestions, setSuggestions] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const [
    searchName,
    { loading: loadingNames, data: searchNameResponse },
  ] = useLazyQuery(SearchAuthorName);
  const [
    searchNameByAll,
    { loading: loadingNamesByAll, data: searchNameByAllResponse },
  ] = useLazyQuery(SearchAuthorNameByAll);

  const inputProps = {
    placeholder: 'Type Author',
    value: searchWord,
    onChange: (event, { newValue }) => {
      setSearchWord(newValue);
    },
  };

  const getInitialData = async () => {
    const response = await getPeople();
    setPeople(List(response));
  };
  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    setPeople(sortAuthors(selectedOption.sort));
  }, [selectedOption]);

  useEffect(() => {
    if (searchNameResponse) {
      if (searchNameResponse.authors.length === 0)
        return setSuggestions([{ name: searchWord }]);
      setSuggestions(searchNameResponse.authors);
    }
  }, [searchNameResponse]);

  useEffect(() => {
    if (searchNameByAllResponse) {
      setPeople(
        sortAuthors(selectedOption.sort, List(searchNameByAllResponse.authors)),
      );
    }
  }, [searchNameByAllResponse]);

  const sortAuthors = (sortFn, authors) => {
    if (authors) return List(authors.sort(sortFn));
    return people.sort(sortFn);
  };

  const handleChange = (selectedOpt) => {
    setSelectedOption(selectedOpt);
  };

  const debouncedSearchName = useCallback(debounce(searchName, 500), []);
  const onSuggestionsFetchRequested = ({ value }) => {
    debouncedSearchName({
      variables: { name: value },
    });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;
  const renderSuggestion = (suggestion) => (
    <div className="list-item">{suggestion.name}</div>
  );

  const onSuggestionSelected = (e, { suggestionValue }) => {
    setSearchWord('');
    searchNameByAll({ variables: { name: suggestionValue } });
  };

  const shouldRenderSuggestions = (value) => {
    return value.trim().length >= 2;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchWord('');
    searchNameByAll({ variables: { name: searchWord } });
  };

  return (
    <StyledPeople>
      <div className="wrapper">
        <div className="top">
          <div className="search">
            <form onSubmit={onSubmit}>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                shouldRenderSuggestions={shouldRenderSuggestions}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
              {loadingNames && <img src={Spinner} className="icon" />}
            </form>
          </div>
          <div className="sort">
            <Select
              options={options}
              value={selectedOption}
              onChange={handleChange}
              styles={customStyles}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="main">
          {people.size === 0 && (
            <div className="no-author">No Author Found.</div>
          )}
          {people.map((person) => {
            return <PersonItem key={person.id} person={person}></PersonItem>;
          })}
        </div>
      </div>
    </StyledPeople>
  );
}

const options = [
  {
    value: 'Name Ascending',
    label: (
      <span>
        <ArrowUpOutlined />
        &nbsp; Name
      </span>
    ),
    sort: (a, b) => {
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
      if (a.name > b.name) return 1;
    },
  },
  {
    value: 'Name Descending',
    label: (
      <span>
        <ArrowDownOutlined />
        &nbsp; Name
      </span>
    ),
    sort: (a, b) => {
      if (a.name > b.name) return -1;
      if (a.name === b.name) return 0;
      if (a.name < b.name) return 1;
    },
  },
  {
    value: 'Count',
    label: (
      <span>
        <ArrowDownOutlined />
        &nbsp; Quotes Number
      </span>
    ),
    sort: (a, b) => {
      return b.quotes.length - a.quotes.length;
    },
  },
];

const customStyles = {
  option: (styles, state) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#86c876' : 'transparent',
    };
  },
  control: (styles, state) => {
    return {
      ...styles,
      cursor: 'pointer',
      boxShadow: state.isFocused ? '0 0 2px 2px #86c876' : styles.boxShadow,
      borderColor: state.isFocused ? '#86c876' : styles.borderColor,
      '&:hover': { borderColor: '#86c876', boxShadow: '0 0 2px 2px #86c876' },
    };
  },
};
