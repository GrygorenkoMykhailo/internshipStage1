import React, { useContext } from 'react';
import { Note, NoteContextType } from '../../types';
import { NoteContext } from '../../context/NoteContext';

type NoteCardComponentProps = {
    note: Note,
}

export const NoteCardComponent: React.FC<NoteCardComponentProps> = ({ note }) => {
    const { deleteNote } = useContext(NoteContext) as NoteContextType;

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
                <p className="text-gray-700 text-base mb-4">{note.content}</p>
                <p className="text-gray-500 text-sm">{`Created at: ${note.createdAt.toLocaleDateString()}`}</p>
                <button onClick={() => deleteNote(note.id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
            </div>
        </div>
    );
};