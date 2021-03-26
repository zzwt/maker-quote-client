import styled from 'styled-components';

export const StyledHeader = styled.div`
  background: rgba(0, 0, 0, 0.85);
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header {
  }
  .header-left {
    margin-left: 30px;
    font-weight: 500;
  }

  .header-right {
    margin-right: 30px;
    display: flex;

    .link-style {
      /* background: green; */
      margin-left: 20px;
      color: darkgrey;
      padding: 5px;
      &:hover {
        border-bottom: 2px solid #fdb035;
      }
    }
    .link-active {
      border-bottom: 2px solid #fdb035;
    }
  }
`;
