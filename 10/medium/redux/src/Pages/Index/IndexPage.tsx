import { NoteListComponent } from '../../Components/NoteListComponent';
import { CreateNoteComponent } from '../../Components/CreateNoteComponent';
import { useAppSelector } from '../../hooks';

export const IndexPage = () => {
    const notes = useAppSelector(state => state.notes.notes);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Notes</h1>
            <NoteListComponent notes={notes} />
            <CreateNoteComponent/>
        </div>
    );
};
