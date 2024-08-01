import React from 'react';
import { Note } from '../../types';
import { NoteCardComponent } from '..';

type NoteListComponentPoprs = {
    notes: Note[] | undefined
}

export const NoteListComponent: React.FC<NoteListComponentPoprs> = ({ notes }) => {

    if(!notes){
        return <div>Notes are not available</div>
    }

    return (
        <div>
            {notes.map(note => (
                <NoteCardComponent key={note.id} note={note} />
            ))}
        </div>
    );
};
