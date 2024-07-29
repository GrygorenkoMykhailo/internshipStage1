import { useContext } from 'react';
import { NoteContext } from '../../context/NoteContext';
import { NoteListComponent } from '../../Components/NoteListComponent';
import { CreateNoteComponent } from '../../Components/CreateNoteComponent';

export const IndexPage = () => {
    const context = useContext(NoteContext);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Notes</h1>
            <NoteListComponent notes={context?.notes} />
            <CreateNoteComponent/>
        </div>
    );
};
