import styled from 'styled-components';

export const StyledButton = styled.div`
  color: ${(props) => (props.active ? '#ffffff' : props.color)};
  background-color: ${(props) => (props.active ? props.color : '')};
  cursor: pointer;
  border-radius: 7px;
  padding: 5px 8px;
  margin-right: 10px;
  &:hover {
    background-color: ${(props) => props.color};
    color: #ffffff;
  }
`;
