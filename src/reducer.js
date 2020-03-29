import {
  RECEIVED_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  SELECT_NOTE,
  REMOVE_NOTE,
} from './actions';

function randomSequence(length) {
  return Math.random()
    .toString(36)
    .substr(2);
}

function uuid() {
  return new Array(3)
    .fill()
    .map(randomSequence)
    .join('-');
}

export default function reducer(state, action) {
  switch (action.type) {
    case RECEIVED_NOTES:
      return {
        ...state,
        notes: action.payload.notes,
      };
    case ADD_NOTE: {
      const id = uuid();
      return {
        ...state,
        notes: {
          ...state.notes,
          [id]: {id, text: ''},
        },
        selectedNoteId: id,
      };
    }
    case UPDATE_NOTE: {
      const {id, text} = action.payload;
      return {
        ...state,
        notes: {
          ...state.notes,
          [id]: {id, text},
        },
      };
    }
    case SELECT_NOTE: {
      const {id} = action.payload;
      return {
        ...state,
        selectedNoteId: id,
      };
    }
    case REMOVE_NOTE: {
      const {id} = action.payload;
      delete state.notes[id];
      return {
        ...state,
        selectedNote: null,
      };
    }

    default:
      throw new Error();
  }
}
