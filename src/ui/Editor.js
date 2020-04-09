import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  resize: none;
  border: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  overflow: auto;
  padding: 0;
  line-height: 24px;
  margin: 0;
  height: 100%;
  min-height: 300px;
  width: 100%;
  :focus {
    outline: none;
  }
`;

function removeTabCharacter(string) {
  if (string.startsWith('  ')) {
    return string.substring(2);
  }
  if (string.startsWith(' ')) {
    return string.substring(1);
  }
  return string;
}

function addTabCharacter(string) {
  return '  ' + string;
}

function toLines(string) {
  return string.split('\n');
}

function indent(string) {
  return toLines(string).map(addTabCharacter).join('\n');
}

function outdent(string) {
  return toLines(string).map(removeTabCharacter).join('\n');
}

function lastIndexOf(string, char) {
  const parts = string.split('\n');
  parts.pop();
  return parts.join('').length;
}

function selectLine(string, selectionStart, selectionEnd) {
  const firstHalf = string.substring(0, selectionStart);
  const lineStart = lastIndexOf(string.substring(0, selectionStart), '\n');

  const secondHalf = string.substring(selectionEnd);
  const lineEnd =
    secondHalf.indexOf('\n') === -1
      ? string.length
      : secondHalf.indexOf('\n') + firstHalf.length;
  return {lineStart, lineEnd};
}

const handleKeyDown = e => {
  if (e.key !== 'Tab') return {newValue: e.target.value, tabsAdded: 0};

  const shouldIndent = e.key === 'Tab' && !e.shiftKey;

  e.preventDefault();

  let {selectionStart, selectionEnd, value} = e.target;

  let selection = value.substring(selectionStart, selectionEnd);
  if (selectionStart === selectionEnd) {
    const {lineStart, lineEnd} = selectLine(
      value,
      selectionStart,
      selectionEnd
    );
    selectionStart = lineStart;
    selectionEnd = lineEnd;
    selection = value.substring(lineStart, lineEnd);
  }

  const updatedSelection = shouldIndent
    ? indent(selection)
    : outdent(selection);

  const newValue =
    value.substring(0, selectionStart) +
    updatedSelection +
    value.substring(selectionEnd);

  const tabsAdded = shouldIndent ? 1 : -1;
  return {
    newValue,
    selectionStart: selectionStart + 2 * tabsAdded,
    selectionEnd: selectionEnd + 4 * tabsAdded,
  };
};

export const Editor = ({value, onChange}) => {
  const [{selectionStart, selectionEnd}, setSelectionRange] = useState(0);
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, [value]);

  useEffect(() => {
    if (selectionStart === selectionEnd) return;
    inputEl.current.selectionStart = selectionStart;
    inputEl.current.selectionEnd = selectionEnd;
  }, [value]);

  return (
    <Textarea
      ref={inputEl}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => {
        const {newValue, selectionStart, selectionEnd} = handleKeyDown(e);
        setSelectionRange({
          selectionStart,
          selectionEnd,
        });
        onChange(newValue);
      }}
    />
  );
};
