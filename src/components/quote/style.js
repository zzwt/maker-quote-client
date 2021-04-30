import styled from 'styled-components';
import quoteIn from '../../../public/img/quote_in.png';
import quoteOut from '../../../public/img/quote_out.png';
export const StyledQuote = styled.div`
  margin-top: ${(props) => (props.mt ? props.mt : ' 110px')};
  color: white;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  .card {
    height: 400px;
    /* background: ${(props) => props.color}; */
    /* margin: 60px 0 0 0; */
    border-radius: 20px;
    /* padding: 80px 20px 120px 20px; */
    position: relative;
    .quote-in {
      position: absolute;
      background: url(${quoteIn});
      left: 10%;
      top: 10%;
      width: 30px;
      height: 26px;
      background-size: cover;
    }
    .content {
      /* background: lightgrey; */
      display: flex;
      align-items: center;
      margin-top: 85px;
      padding: 0 25px;
      line-height: 1.52;
      color: white;
      /* background: grey; */
      height: 200px;
      font-size: ${(props) => props.fontSize};
      text-align: center;
    }
    .name {
      margin: 0 auto 0;
      text-align: center;
    }
    .title {
      margin-top: 3px;
      text-align: center;
      font-size: 0.6rem;
      color: lightgrey;
    }
    .quote-out {
      position: absolute;
      background: url(${quoteOut});
      right: 8%;
      bottom: 30%;
      width: 30px;
      height: 26px;
      background-size: cover;
    }
    .logos {
      /* margin-bottom: 400px;
      margin-left: auto;
      margin-right: auto; */
      /* background: yellow; */
      /* width: 170px; */
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 6%;
    }
    .pic {
      width: 120px;
      height: 120px;
      left: 50%;
      position: absolute;
      transform: translate(-50%, 0);
      top: -15%;
      border-radius: 13px;
    }
  }
  .tags {
    margin: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .tag {
      margin: 5px;
    }
  }
`;
