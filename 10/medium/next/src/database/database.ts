import { Note } from "@/Types";

let notes: Note[] = [
  { id: 1, title: 'First Note', content: 'This is the content of the first note.', createdAt: new Date().toLocaleDateString() },
  { id: 2, title: 'Second Note', content: 'This is the content of the second note.', createdAt: new Date().toLocaleDateString() },
  { id: 3, title: 'Third Note', content: 'This is the content of the third note.', createdAt: new Date().toLocaleDateString() },
];

export const getNotes = (): Note[] => notes;

export const addNote = (note: Note): void => {
  notes.push(note);
};

export const deleteNote = (id: number): void => {
  notes = notes.filter(note => note.id !== id);
};