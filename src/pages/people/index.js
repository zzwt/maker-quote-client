import { useState, useEffect, useCallback, useRef } from 'react';
// import { getPeople } from '@/services';
import { SORT, PAGE_SIZE } from '@/services/constants';
import { List } from 'immutable';
import debounce from 'lodash/debounce';
import { useLazyQuery } from '@apollo/client';
import {
  GetAutoSuggestionNames,
  SearchAllAuthorsByName,
} from '@/services/query';
import PersonItem from '@/components/PersonItem';
import { StyledPeople } from './style.js';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';
import SpinnerImg from '@/../public/img/spinner.gif';
import Button from '@/components/button';
import Modal from '@/components/modal';
import Spinner from '@/components/spinner';
export default function PeoplePage() {
  const [people, setPeople] = useState(List());
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(1);

  const [
    getAutoSuggestionNames,
    { loading: loadingNames, data: autoSuggestionNamesResponse },
  ] = useLazyQuery(GetAutoSuggestionNames, { fetchPolicy: 'no-cache' });
  const [
    searchAllAuthorsByName,
    { loading: loadingAllAuthors, data: allAuthorsByNameResponse },
  ] = useLazyQuery(SearchAllAuthorsByName, {
    variables: {
      filter: {},
      limit: PAGE_SIZE,
      start: PAGE_SIZE * (page - 1),
      sort: selectedOption.value === SORT.NAME_ASC ? 'name:asc' : 'name:desc',
    },
  });

  const inputProps = {
    placeholder: 'Type Author Name',
    value: searchWord,
    onChange: (event, { newValue }) => {
      setSearchWord(newValue);
    },
  };

  // const getInitialData = async () => {
  //   const response = await getPeople();

  // };
  useEffect(() => {
    searchAllAuthorsByName();
  }, []);

  useEffect(() => {
    if (allAuthorsByNameResponse) {
      console.log('page', page);
      if (page === 1) return setPeople(List(allAuthorsByNameResponse.authors));
      setPeople(people.concat(allAuthorsByNameResponse.authors));
    }
  }, [allAuthorsByNameResponse]);

  // useEffect(() => {
  //   // setPeople(sortAuthors(selectedOption.sort));
  //   setSelectedOption(selected)
  // }, [selectedOption]);

  useEffect(() => {
    if (autoSuggestionNamesResponse) {
      if (autoSuggestionNamesResponse.authors.length === 0)
        return setSuggestions([{ name: searchWord }]);
      setSuggestions(autoSuggestionNamesResponse.authors);
    }
  }, [autoSuggestionNamesResponse]);

  // useEffect(() => {
  //   if (allAuthorsByNameResponse) {
  //     setPeople(
  //       sortAuthors(
  //         selectedOption.sort,
  //         List(allAuthorsByNameResponse.authors),
  //       ),
  //     );
  //   }
  // }, [allAuthorsByNameResponse]);

  const sortAuthors = (sortFn, authors) => {
    if (authors) return List(authors.sort(sortFn));
    return people.sort(sortFn);
  };

  const handleSortingChange = (selectedOpt) => {
    setSelectedOption(selectedOpt);
    setPage(1);
    searchAllAuthorsByName({
      variables: { filter: { name_contains: searchWord } },
    });
  };

  const debouncedGetAutoSuggestionNames = useCallback(
    debounce(getAutoSuggestionNames, 500),
    [],
  );
  const onSuggestionsFetchRequested = ({ value }) => {
    debouncedGetAutoSuggestionNames({
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
    // setSearchWord('');
    setPage(1);
    searchAllAuthorsByName({
      variables: { filter: { name_contains: suggestionValue } },
    });
  };

  const shouldRenderSuggestions = (value) => {
    return value.trim().length >= 2;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    if (searchWord.trim().length > 0) {
      searchAllAuthorsByName({
        variables: { filter: { name_contains: searchWord } },
      });
    } else {
      searchAllAuthorsByName({
        variables: { filter: {} },
      });
      setSearchWord('');
    }
  };

  const loadMore = () => {
    setPage(page + 1);
    searchAllAuthorsByName({
      variables:
        searchWord.trim().length > 0
          ? { filter: { name_contains: searchWord } }
          : {},
    });
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
              {loadingNames && <img src={SpinnerImg} className="icon" />}
            </form>
          </div>
          <div className="sort">
            <Select
              options={options}
              value={selectedOption}
              onChange={handleSortingChange}
              styles={customStyles}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="main">
          {!loadingAllAuthors && people.size === 0 && (
            <div className="no-author">No Author Found.</div>
          )}
          <Modal active={loadingAllAuthors}>
            <Spinner></Spinner>
          </Modal>
          {people.map((person) => {
            return <PersonItem key={person.id} person={person}></PersonItem>;
          })}
        </div>
        {!loadingAllAuthors &&
          allAuthorsByNameResponse &&
          Math.ceil(allAuthorsByNameResponse.authorsCount / PAGE_SIZE) >
            page && (
            <div className="loadmore">
              <Button title="Load More" active onClick={loadMore}></Button>
            </div>
          )}
      </div>
    </StyledPeople>
  );
}

const options = [
  {
    value: SORT.NAME_ASC,
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
    value: SORT.NAME_DESC,
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
  // {
  //   value: 'Count',
  //   label: (
  //     <span>
  //       <ArrowDownOutlined />
  //       &nbsp; Quotes Number
  //     </span>
  //   ),
  //   sort: (a, b) => {
  //     return b.quotes.length - a.quotes.length;
  //   },
  // },
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
