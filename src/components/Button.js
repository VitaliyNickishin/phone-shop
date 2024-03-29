import styled from 'styled-components'

export const ButtonContainer = styled.button`
 margin: 0.2rem 0.5rem 0.2rem 0;
 padding: 0.2rem 0.5rem;
 text-transform: capitalize;
 font-size: 1.4rem;
 background-color: transparent;
 border: 0.05rem solid var(--lightBlue);
 border-color: ${yo => 
  yo.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
 color: ${yo => 
  yo.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
 border-radius: 0.5rem;
 cursor: pointer;
 transition: all 0.2s ease-in-out;
 &:hover{
  background-color: ${yo => 
   yo.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
  color: var(--mainBlue);
 }
 &:focus{
  outline: none;
 }
`;