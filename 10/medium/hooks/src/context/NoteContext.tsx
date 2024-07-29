import React, { useState } from 'react';
import { NoteContextType, Note } from '../Types';

export const NoteContext = React.createContext<NoteContextType | null>(null);

const NoteProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [notes, setNotes] = useState<Note[]>([
        { id: 1, title: 'First Note', content: 'This is the content of the first note.', createdAt: new Date() },
        { id: 2, title: 'Second Note', content: 'This is the content of the second note.', createdAt: new Date() },
        { id: 3, title: 'Third Note', content: 'This is the content of the third note.', createdAt: new Date() }]
    );

    const createNote = (note: Note) => {
        setNotes(prevNotes => [...prevNotes, note]);
    };

    const deleteNote = (id: number) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    return <NoteContext.Provider value={{ notes, createNote, deleteNote }}>{children}</NoteContext.Provider>
}

export default NoteProvider;