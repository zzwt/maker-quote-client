import styled from 'styled-components';
export const StyledTag = styled.div.attrs((props) => ({
  color: props.color,
}))`
  font-size: 0.6rem;
  font-weight: 500;
  color: #ffffff;
  background-color: ${(props) => props.color};
  cursor: pointer;
  /* border: 1px solid ${(props) => props.fontColor}; */
  border-radius: 4px;
  padding: 3px 6px;
  /* margin-right: 7px; */
  /* margin-top: 5px; */
`;
