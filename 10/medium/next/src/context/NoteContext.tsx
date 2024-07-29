"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { NoteContextType, Note } from '../Types';

export const NoteContext = React.createContext<NoteContextType | null>(null);

const NoteProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        (async () => {
          const response = await axios.get('/api/notes/getNotes')
          const data = response.data as Note[];
          setNotes(data);
        })()
      }, []);

    const createNote = async (note: Note) => {
        const response = await axios.post('/api/notes/createNote', note);
        if(response.status === 201){
            setNotes(prevNotes => [...prevNotes, note]);
        }
    };

    const deleteNote = async (id: number) => {
        const response = await axios.delete('/api/notes/deleteNote?id=' + id);
        if(response.status === 200){
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        }
    };

    return <NoteContext.Provider value={{ notes, createNote, deleteNote }}>{children}</NoteContext.Provider>
}

export default NoteProvider;