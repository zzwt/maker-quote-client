import styled from 'styled-components';
import bgImage from '../../public/img/banner.jpg';
export const StyledQuotes = styled.div`
  .banner {
    /* width: 100%; */
    background-image: url(${bgImage});
    background-position: center;
    background-size: cover;
    .mask {
      background-color: rgba(0, 0, 0, 0.6);
      height: 400px;
      position: relative;
      .desc {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #ffffff;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          font-size: 2.5rem;
          font-weight: 700;
        }
        .sub-title {
          font-size: 1.2rem;
          margin-top: 20px;
        }
      }
    }
  }
  .main-wrapper {
    display: flex;
    padding-bottom: 30px;
    .tags-list {
      display: flex;
      justify-content: flex-start;
      /* background: green; */
      flex-direction: column;
      flex-wrap: wrap;
      margin: 50px 0 0 20px;
      width: 150px;
      .all-tags {
        color: white;
        text-align: center;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 5px;
        &:hover {
          background: #666666;
        }
      }
      .all-tags-active {
        background: #666666;
      }
    }

    .main {
      /* padding-right: 50px; */
      /* width: 1300px; */
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      /* background: green; */
      padding: 0 35px 35px;
      .main-quote {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
        column-gap: 25px;
      }
      .main-loadmore {
        display: flex;
        justify-content: center;
        margin-top: 50px;
      }
    }
  }
`;
