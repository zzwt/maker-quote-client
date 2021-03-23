import styled from 'styled-components';

export const StyledLogo = styled.div`
  width: 160px;
  .container {
    font-size: 0.7rem;
    border: 1px solid ${(props) => props.color};
    padding: 7px 3px;
    border-radius: 3px;
    color: ${(props) => props.color};
    font-weight: 600;
    text-align: center;
  }
`;
