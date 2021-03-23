import styled from 'styled-components';

export const StyledModal = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  .child {
    position: absolute;
    left: 50%;
    top: 50%;
    color: red;
    transform: translate(-50%, -50%);
  }
`;
