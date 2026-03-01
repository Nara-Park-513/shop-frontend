// src/styled/Footer.styles.ts
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 80px;

  max-width: 1100px;  
  margin: 0 auto;   
  padding: 60px 32px; 
  background-color: #ffffff;
  border-top: 1px solid #eee;
  border: 5px solid red;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #111;
`;

export const Item = styled.p`
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 8px;
  color: #444;

  cursor: pointer;

  &:hover {
    color: #000;
  }
`;