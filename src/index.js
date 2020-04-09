import React, {useState, useEffect, useReducer} from 'react';
import {render} from 'react-dom';

import {useNotes} from './hooks';
import {addNote, updateNote, removeNote, selectNote} from './actions';
import {Box, Button, Editor, Icon, ListItem, Text} from './ui';
import {fetchRemoveNote, fetchUpdateNote} from './api';
import styled from 'styled-components';

const NotePreview = props => {
  return (
    <Box padding='0 0 4px 0' width='300px'>
      <ListItem onClick={props.onClick} selected={props.selected}>
        <Text>{props.text}</Text>
        {props.onRemove && (
          <Button onClick={props.onRemove}>
            <Icon name='delete' />
          </Button>
        )}
      </ListItem>
    </Box>
  );
};

const App = () => {
  const [state, dispatch] = useNotes();
  const {notes, selectedNoteId} = state;
  const notesList = Object.values(notes);
  const selectedNote = notes[selectedNoteId] || notesList[0];

  if (!selectedNote) {
    dispatch(addNote());
    return null;
  }

  return (
    <Box display='flex' height='100vh'>
      <Box position='fixed' top='24px' left='24px'>
        <NotePreview text='+ add note' onClick={() => dispatch(addNote())} />
        {notesList.map(note => (
          <NotePreview
            key={note.id}
            selected={note.id === selectedNote.id}
            text={note.text.slice(0, 40)}
            onRemove={() =>
              fetchRemoveNote(note.id).then(() => dispatch(removeNote(note.id)))
            }
            onClick={() => dispatch(selectNote(note.id))}
          />
        ))}
      </Box>
      <Box flex={1} position='relative' left='324px' maxWidth='800px'>
        <Editor
          defaultValue={selectedNote.text}
          onChange={text => {
            fetchUpdateNote(selectedNote.id, text);
            dispatch(updateNote(selectedNote.id, text));
          }}
        />
      </Box>
    </Box>
  );
};

render(<App />, document.getElementById('app'));
