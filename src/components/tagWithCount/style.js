import styled from 'styled-components';
import tinycolor from 'tinycolor2';

export const StyledTag = styled.div`
  /* color: */
  font-size: 0.6rem;
  background-color: ${(props) =>
    props.active ? tinycolor(props.color).darken(15) : ''};

  cursor: pointer;
  border-radius: 5px;
  /* margin-bottom: 5px; */
  /* border: 1px solid ${(props) => props.color}; */
  /* padding: 5px 8px; */
  &:hover {
    background-color: ${(props) => tinycolor(props.color).darken(15)};
    color: #ffffff;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    /* .first {
      padding-left: 20px;
    } */

    /* .left {
      display: flex;
      align-items: center;
    } */

    .count {
      display: flex;
      /* font-size: 0.65rem; */
      justify-content: center;
      align-items: center;
      min-width: 20px;
      /* height: 20px; */
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      /* background: white; */
      padding: 2px 5px;
      border: 1px solid ${(props) => props.color};
      color: white;
      /* margin-left: 5px; */
    }
  }
`;
export const StyledTagLeft = styled.div`
  font-weight: 500;
  color: #ffffff;
  background-color: ${(props) => props.color};
  cursor: pointer;
  /* border: 1px solid ${(props) => props.fontColor}; */
  /* border-top-left-radius: 4px;
  border-bottom-left-radius: 4px; */
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 3px 6px;
`;
