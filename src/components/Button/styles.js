import styled from "styled-components";

export const Container = styled.button`
  width: 340px;  
  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  display: block;
  
  height: 56px;
  border: 0;
  padding: 0 56px;
  margin-top: 16px;
  border-radius: 10px;
  font-weight: 500;
  text-align: center;

  margin-bottom: 90px;

  &:disabled {
    opacity: 0.5; 
  }
  
`;
