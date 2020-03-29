import React from 'react';
import styled from 'styled-components';

export * from './Editor';

export const Box = styled.div`
  box-sizing: border-box;
  overflow: ${props => props.overflow};
  border-radius: ${props => props.borderRadius};
  height: ${props => props.height};
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  display: ${props => props.display};
  flex: ${props => props.flex};
  margin: ${props => props.margin};
  border: ${props => props.border};
  padding: ${props => props.padding};
  box-shadow: ${props => props.boxShadow};
  background: ${props => props.background};
`;

export const Button = styled.button`
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1em;
  font-family: inherit;
  color: inherit;
  :hover {
    color: #fa9f9f;
  }
  :active,
  :focus {
    outline: none;
  }
`;

export const Icon = ({name}) => {
  return <i className='material-icons'>{name}</i>;
};

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 12px;
  background: ${props => props.selected ? '#333' : 'auto'};
  color: ${props => props.selected ? 'white' : 'inherit'};
  border-radius: 4px;
  :hover {
    background: #333;
    color: white;
  }
`