import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../Types";

export interface notesState{
    notes: Note[],
}

const initialState: notesState = {
    notes: [
        { id: 1, title: 'First Note', content: 'This is the content of the first note.', createdAt: new Date().toLocaleDateString() },
        { id: 2, title: 'Second Note', content: 'This is the content of the second note.', createdAt: new Date().toLocaleDateString() },
        { id: 3, title: 'Third Note', content: 'This is the content of the third note.', createdAt: new Date().toLocaleDateString() },
    ],
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
        },
        deleteNote: (state, action: PayloadAction<number>) => {
            state.notes = state.notes.filter(n => n.id !== action.payload);
        },
    }
})
    
export const { createNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;

