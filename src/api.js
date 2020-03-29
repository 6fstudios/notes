let CACHE = {};

export const fetchNotes = () => {
  const string = window.localStorage.getItem('the_notes') || '{}';
  CACHE = JSON.parse(string)
  console.log(CACHE)
  return Promise.resolve(CACHE)
}

export const fetchRemoveNote = (id) => {
  delete CACHE[id];
  window.localStorage.setItem('the_notes', JSON.stringify(CACHE))
  return Promise.resolve(CACHE)
}

export const fetchUpdateNote = (id, text = '') => {
  CACHE[id] = {id, text}
  window.localStorage.setItem('the_notes', JSON.stringify(CACHE))
  return Promise.resolve(CACHE[id]);
}