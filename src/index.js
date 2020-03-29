import React, {useState, useEffect, useReducer} from 'react';
import {render} from 'react-dom';

import {useNotes} from './hooks';
import {addNote, updateNote, removeNote, selectNote} from './actions';
import {Box, Button, Icon, Editor, ListItem} from './ui';
import {fetchRemoveNote, fetchUpdateNote} from './api';

const NotePreview = props => {
  return (
    <Box padding='0 0 4px 0'>
      <ListItem onClick={props.onClick} selected={props.selected}>
        <span>{props.text}</span>
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
    dispatch(addNote())
    return null;
  }

  return (
    <Box display='flex' height='100vh'>
      <Box maxWidth='300px' flex={1} margin='24px 0px 0px 24px' overflow='auto'>
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
      <Box flex={2} margin='24px' maxWidth='800px'>
        <Box
          padding='36px'
          height='100%'
          boxShadow='0px 0px 10px #ccc'
          background='white'
          borderRadius='4px'
        >
          <Editor
            value={selectedNote.text}
            onChange={text =>
              fetchUpdateNote(selectedNote.id, text).then(
                () => dispatch(updateNote(selectedNote.id, text))
              )
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

render(<App />, document.getElementById('app'));
