import styled from 'styled-components';

export const StyledPersonItem = styled.div`
  padding: 20px 0;

  cursor: pointer;
  .container {
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 250px;
      height: 250px;
      object-fit: cover;
      border-radius: 20px;
    }
    .name {
      font-weight: 600;
      padding: 10px 0;
      color: white;
    }
    .title {
      font-weight: 500;
      font-size: 0.7rem;
      color: lightgrey;
      text-align: center;
    }
  }
`;
