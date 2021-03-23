import { useState, useEffect, useCallback } from 'react';
import { getPeople } from '@/services';
import { history } from 'umi';
import { useQuery, gql } from '@apollo/client';
import Quote from '@/components/quote';
import { StyledPeopleDetail } from './style.js';
import { ArrowLeftOutlined } from '@ant-design/icons';
import TagWithCount from '@/components/tagWithCount';
import Modal from '@/components/modal';
import Spinner from '@/components/spinner';
import { AuthorWithQuotes } from '@/services/query';
export default function PeoplePage(props) {
  const [person, setPerson] = useState(null);
  const { loading, error, data } = useQuery(AuthorWithQuotes, {
    variables: { id: props.match.params.id },
  });
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [allTags, setAllTags] = useState(null);
  const [currentTag, setCurrentTag] = useState(0);

  // const getInitialData = async () => {
  //   const id = props.match.params.id;
  //   if (id) {
  //     const response = await getPeople(id);
  //     setPerson(response);
  //   }
  // };
  useEffect(() => {
    if (data) {
      // console.log(data.author);
      setFilteredQuotes(data.author.quotes);
      setAllTags(generateAllTags(data.author.quotes));
    }
  }, [data]);

  const goBack = () => {
    history.goBack();
  };

  const generateAllTags = (quotes) => {
    const tagsMap = {};
    quotes.forEach((quote) => {
      return quote.tags.forEach((tag) => {
        if (tagsMap[tag.id]) {
          tagsMap[tag.id] = {
            ...tagsMap[tag.id],
            count: tagsMap[tag.id].count + 1,
          };
        } else {
          tagsMap[tag.id] = {
            id: tag.id,
            name: tag.name,
            color: tag.color,
            count: 1,
          };
        }
      });
    });
    const result = [
      { id: -1, name: 'All', count: quotes.length, color: '#666666' },
    ];
    Object.keys(tagsMap).forEach((key) => {
      result.push(tagsMap[key]);
    });
    return result;
  };

  const changeTag = (id) => {
    const index = allTags.findIndex((tag) => {
      return tag.id === id;
    });
    setCurrentTag(index);
    if (id === -1) {
      setFilteredQuotes(data.author.quotes);
    } else {
      setFilteredQuotes(
        data.author.quotes.filter((quote) => {
          return (
            quote.tags.findIndex((tag) => {
              return tag.id === id;
            }) >= 0
          );
        }),
      );
    }
  };

  const renderFilterTagList = () => {
    return (
      <div className="middle">
        <div className="label">Filter:</div>
        <div className="filters">
          {allTags &&
            allTags.map((tag, index) => {
              return (
                <div className="filterItem">
                  <TagWithCount
                    tag={tag}
                    count={tag.count}
                    active={currentTag === index}
                    onClick={changeTag}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const renderQuotes = () => {
    return filteredQuotes.map((quote) => {
      return (
        <Quote key={quote.id} quote={quote} mt="0px" onClick={changeTag} />
      );
    });
  };

  const renderAuthor = ({ name, title, pic, desc }) => {
    return (
      <div className="wrapper">
        <div className="top">
          <img src={pic.url} />
          <div className="right">
            <h1 className="name">{name}</h1>
            <h3 className="title">{title}</h3>
            {desc && <h3 className="summary">Introduction:</h3>}
            <h4 className="desc">{desc}</h4>
          </div>
        </div>
        {renderFilterTagList()}
        <div className="bottom">{renderQuotes()}</div>
      </div>
    );
  };

  return (
    <StyledPeopleDetail>
      <div className="back" onClick={goBack}>
        <ArrowLeftOutlined />
      </div>
      {error && <h1>loading..</h1>}
      <Modal active={loading}>
        <Spinner />
      </Modal>
      {data && renderAuthor(data.author)}
      {/* {console.log(data)} */}
    </StyledPeopleDetail>
  );
}
