import styled from 'styled-components';
export const StyledPeopleDetail = styled.div`
  background: #2a2a2a;
  padding: 50px 0;
  .back {
    width: 50px;
    height: 50px;
    color: white;
    /* background: red; */
    margin-left: 50px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 2rem;
    border-radius: 25px;
    border: 1px solid white;
    cursor: pointer;
    &:hover {
      background: lightgrey;
    }
  }
  .top {
    display: flex;
    /* align-items: center; */
    img {
      height: 250px;
      width: 250px;
      object-fit: cover;
      border-radius: 125px;
    }
    .right {
      margin-left: 50px;
      width: 600px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .name {
        font-size: 2rem;
        font-weight: 700;
        color: white;
      }
      .title {
        color: white;
        background-color: #4ec06f;
        padding: 0 10px;
        border-radius: 5px;
      }
      .summary {
        color: white;
        font-weight: 600;
      }
      .desc {
        color: lightgrey;
      }
    }
  }
  .middle {
    padding: 50px 0;
    /* background: red; */
    display: flex;
    align-items: center;
    color: white;

    .label {
      /* width: 200px; */
      margin-right: 10px;
      margin-top: 7px;
    }
    .filters {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      .filterItem {
        margin-right: 7px;
        margin-top: 7px;
      }
    }
  }
  .bottom {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    column-gap: 25px;
  }
`;
