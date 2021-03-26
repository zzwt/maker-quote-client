import { useState, useEffect, useCallback, useRef } from 'react';
import { TagsWithCount, GetQuotes } from '@/services/query';
import { List } from 'immutable';
import { PAGE_SIZE } from '@/services/constants';
import { useQuery, useLazyQuery } from '@apollo/client';
import Quote from '@/components/quote';
import { StyledQuotes } from './style.js';
import TagWithCount from '@/components/tagWithCount';
import Modal from '@/components/modal';
import Spinner from '@/components/spinner';
import Button from '@/components/button';

export default function IndexPage() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [currentTag, setCurrentTag] = useState(-1);

  const { loading: tagsLoading, error: tagsError, data: tagsData } = useQuery(
    TagsWithCount,
  );
  const [
    getQuotes,
    { loading: quotesLoading, error: quotesError, data: quotesData },
  ] = useLazyQuery(GetQuotes, {
    variables: {
      filter: {},
      limit: PAGE_SIZE,
      start: PAGE_SIZE * (page - 1),
    },
    // There's a bug in apollo client that onCompleted is not triggered
    // everytime if query hit cache. As a workaround, use useEffect for now.
    // onCompleted: (data) => {
    //   console.log('in onCompleted');
    //   if (page === 1) return setQuotes(List(data.quotes));
    //   setQuotes(quotes.concat(data.quotes));
    // },
  });

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    if (quotesData) {
      if (page === 1) return setQuotes(List(quotesData.quotes));
      setQuotes(quotes.concat(quotesData.quotes));
    }
  }, [quotesData]);

  const clickTag = useCallback(
    async (tagId) => {
      const index = tagsData.tagsWithCount.findIndex((tag) => {
        return tag.id === tagId;
      });
      console.log(index, currentTag);
      if (index !== currentTag) {
        if (tagId === -1) {
          await getQuotes();
        } else {
          await getQuotes({ variables: { filter: { tags_in: tagId } } });
        }
        setCurrentTag(index);
        setPage(1);
      }
    },
    [tagsData, currentTag],
  );

  const renderTags = () => {
    if (tagsLoading) return <div>Loading Tags</div>;
    if (tagsError) return <div>Error Loading Tags</div>;

    return (
      <div>
        <div
          className={
            currentTag === -1 ? 'all-tags all-tags-active' : 'all-tags'
          }
          onClick={(e) => {
            clickTag(-1);
          }}
        >
          All Tags
        </div>
        {tagsData.tagsWithCount.map((tag, index) => {
          return (
            <TagWithCount
              key={tag.id}
              tag={tag}
              count={tag.count}
              active={currentTag === index}
              onClick={clickTag}
            ></TagWithCount>
          );
        })}
      </div>
    );
  };

  const renderQutoes = () => {
    if (quotesError) return <div>Error Loading Qutoes</div>;

    return quotes.map((quote) => {
      return (
        <Quote
          key={quote.id}
          quote={quote}
          imageUrl={quote.author.pic.url}
          onClick={clickTag}
        />
      );
    });
  };

  const loadMore = (e) => {
    setPage(page + 1);
  };

  return (
    <StyledQuotes>
      <div className="banner">
        <div className="mask">
          <div className="desc">
            <div className="title">Unleashing the power of words</div>
            <div className="sub-title">
              Discover the wisdom of world's top creators
            </div>
          </div>
        </div>
      </div>
      <Modal active={tagsLoading || quotesLoading}>
        <Spinner />
      </Modal>
      <div className="main-wrapper">
        <div className="tags-list">{renderTags()}</div>
        <div className="main ">
          <div className="main-quote">{renderQutoes()}</div>
          {!quotesLoading &&
            quotesData &&
            Math.ceil(quotesData.quotesCount / PAGE_SIZE) > page && (
              <div className="main-loadmore">
                <Button title="Load More" active onClick={loadMore} />
              </div>
            )}
        </div>
      </div>
    </StyledQuotes>
  );
}
