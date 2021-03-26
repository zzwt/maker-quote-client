import styled from 'styled-components';
export const StyledPeople = styled.div`
  padding: 50px 0;
  /* color: white; */

  .top {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    margin-bottom: 20px;
    .search {
      grid-column: 2/3;
      justify-self: center;
      color: white;
      height: 50px;
      z-index: 100;
      display: flex;
      position: relative;
      /* color: grey; */
      input {
        width: 250px;
        border-radius: 20px;
        outline: none;
        color: grey;
        padding-left: 20px;
        padding-right: 40px;
        height: 2rem;
        cursor: pointer;
        &:focus {
          border: 2px solid #86c876;
        }
      }
      .react-autosuggest__suggestions-container {
        cursor: pointer;
        width: 95%;
        margin: auto;
        color: grey;
        background: white;
        border-radius: 4px;
        margin-top: 7px;
        .react-autosuggest__suggestions-list {
          list-style: none;
          padding: 10px 22px;
          .react-autosuggest__suggestion--highlighted {
            background-color: #ddd;
          }
          li {
            padding: 5px 10px;
            border-radius: 5px;
            /* border-bottom: 1px solid lightgrey; */
          }
          /* li:last-of-type {
            border-bottom: none;
          } */
        }
      }
      .icon {
        position: absolute;
        right: 5%;
        top: 6px;
        color: grey;
        cursor: pointer;
        width: 20px;
        height: 20px;
      }
    }
    .sort {
      grid-column: 3/4;
      justify-self: end;
      width: 200px;
    }
  }
  .main {
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    justify-content: space-between;
    column-gap: 15px;
    .no-author {
      color: white;
    }
  }
  .loadmore {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
`;
