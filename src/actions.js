export const ADD_NOTE = 'add note';
export function addNote() {
  return {
    type: ADD_NOTE
  }
}

export const UPDATE_NOTE = 'update note';
export function updateNote(id, text) {
  return {
    type: UPDATE_NOTE,
    payload: {
      id,
      text
    }
  }
}

export const REMOVE_NOTE = 'remove note';
export function removeNote(id) {
  return {
    type: REMOVE_NOTE,
    payload: {id}
  }
}

export const SELECT_NOTE = 'select note';
export function selectNote(id) {
  return {
    type: SELECT_NOTE,
    payload: {id}
  }
}

export const RECEIVED_NOTES = 'received notes';
export function receivedNotes(notes) {
  return {
    type: RECEIVED_NOTES,
    payload: {notes}
  }
}