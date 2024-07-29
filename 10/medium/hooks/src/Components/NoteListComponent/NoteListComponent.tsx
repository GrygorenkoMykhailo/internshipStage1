import { Note } from '../../Types';
import { NoteCardComponent } from '../NoteCardComponent';

export const NoteListComponent = (props: { notes: Note[] | undefined }) => {

    if(!props.notes){
        return <div>Notes are not available</div>
    }

    return (
        <div>
            {props.notes.map(note => (
                <NoteCardComponent key={note.id} note={note} />
            ))}
        </div>
    );
};
