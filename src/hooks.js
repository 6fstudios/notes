import {useEffect, useReducer} from 'react';
import {receivedNotes} from './actions';
import {fetchNotes} from './api';
import reducer from './reducer';

export const useNotes = initialNotes => {
  const [state, dispatch] = useReducer(reducer, {
    notes: {},
  });

  useEffect(() => {
    async function fetchData() {
      const savedNotes = await fetchNotes();
      dispatch(receivedNotes(savedNotes));
    }
    fetchData();
  }, []);

  return [state, dispatch];
};
