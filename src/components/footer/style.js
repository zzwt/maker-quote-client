import styled from 'styled-components';

export const StyledFooter = styled.div`
  /* margin-top: 100px; */
  background: rgba(0, 0, 0, 0.85);
  height: 80px;
  /* border-top: 1px solid #b1bac0; */
  /* padding: 20px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #707070;
  .footer-left {
    font-weight: 500;
    display: flex;
    justify-content: flex-start;
    /* flex-direction: column; */
    align-items: center;
    /* span {
      margin-right: 50px;
    } */
  }
  .footer-middle {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .footer-right {
    /* margin-right: 0;
    margin-left: auto; */
    justify-self: end;
    font-weight: 500;
    display: flex;
    align-items: center;
    .space {
      padding: 5px;
    }
  }
`;
