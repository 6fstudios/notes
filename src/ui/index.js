import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

export const Box = styled.div`
  box-sizing: border-box;
  overflow: ${props => props.overflow};
  border-radius: ${props => props.borderRadius};
  height: ${props => props.height};
  min-height: ${props => props.minHeight};
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  display: ${props => props.display};
  flex: ${props => props.flex};
  margin: ${props => props.margin};
  margin-left: ${props => props.marginLeft};
  border: ${props => props.border};
  padding: ${props => props.padding};
  position: ${props => props.position};
  left: ${props => props.left};
  top: ${props => props.top};
  box-shadow: ${props => props.boxShadow};
  background: ${props => props.background};
`;

export const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
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
  background: ${props => (props.selected ? '#333' : 'auto')};
  color: ${props => (props.selected ? 'white' : 'inherit')};
  border-radius: 4px;
  :hover {
    background: #333;
    color: white;
  }
`;

const BlankPage = styled(Box)`
  padding: 36px;
  min-height: calc(100% - 48px);
  box-shadow: 0px 0px 10px #ccc;
  background: white;
  border-radius: 4px;
  margin: 24px;
  :focus {
    outline: none;
  }
`;

export const Editor = ({defaultValue, onChange}) => {
  const el = useRef(null);

  useEffect(() => {
    if (el.current.innerText === defaultValue) return;
    el.current.innerText = defaultValue;
  }, [defaultValue]);

  return (
    <BlankPage
      ref={el}
      contentEditable
      onInput={e => onChange(e.target.innerText)}
    />
  );
};
