import { useContext } from 'react';
import { NoteContext } from '../../context/NoteContext';
import { NoteListComponent, CreateNoteComponent } from '../../components';
import { NoteContextType } from '../../types';

export const IndexPage = () => {
    const { notes } = useContext(NoteContext) as NoteContextType;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Notes</h1>
            <NoteListComponent notes={notes} />
            <CreateNoteComponent/>
        </div>
    );
};
