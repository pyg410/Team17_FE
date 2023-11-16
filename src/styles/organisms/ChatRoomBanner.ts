import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 1rem;
  z-index: 1200;
  justify-content: space-between;
  background-color: rgba(246, 186, 38, 100%);
  position: fixed;
  width: 768px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  width: 100%;
  @media screen and (min-width: 860px) {
    width: 100%;
  }

  & > h1 {
    margin-left: 1rem;
  }
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  padding: 0;
  color: white;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;

export const Loading = styled.div``;
