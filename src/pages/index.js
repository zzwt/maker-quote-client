import { useState, useEffect, useCallback } from 'react';
import { getQuotes, getAllTags } from '@/services';
import Quote from '@/components/quote';
import { StyledQuotes } from './style.js';
import TagWithCount from '@/components/tagWithCount';
import Modal from '@/components/modal';
import Spinner from '@/components/spinner';
export default function IndexPage() {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(-1);
  const [fetching, setFetching] = useState(false);

  const getInitialData = async (params) => {
    setFetching(true);
    const quotesResponse = await getQuotes();
    const tagsResponse = await getAllTags();
    // const tagsWithAll = [{ name: 'All Tags', id: null }, ...tagsResponse];
    setQuotes(quotesResponse);
    setTags(tagsResponse);
    setFetching(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const clickTag = useCallback(
    async (tagId) => {
      setFetching(true);
      const index = tags.findIndex((tag) => {
        return tag.id === tagId;
      });
      try {
        const quotesResponse = await getQuotes(tagId);
        setQuotes(quotesResponse);
        setCurrentTag(index);
      } catch (error) {
        console.log('Error fetching quotes', error);
      } finally {
        setFetching(false);
      }
    },
    [tags],
  );

  const renderTags = () => {
    return (
      <>
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
        {tags.map((tag, index) => {
          return (
            <TagWithCount
              key={tag.id}
              tag={tag}
              count={tag.quotes.length}
              active={currentTag === index}
              onClick={clickTag}
            ></TagWithCount>
          );
        })}
      </>
    );
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
      <Modal active={fetching}>
        <Spinner />
      </Modal>
      <div className="main-wrapper">
        <div className="tags-list">{renderTags()}</div>
        <div className="main ">
          {quotes.map((quote) => {
            return (
              <Quote
                key={quote.id}
                quote={quote}
                imageUrl={quote.author.pic.url}
                onClick={clickTag}
              />
            );
          })}
        </div>
      </div>
    </StyledQuotes>
  );
}
