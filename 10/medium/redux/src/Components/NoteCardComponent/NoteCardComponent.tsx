import { useAppDispatch } from '../../hooks';
import { Note } from '../../Types';
import { deleteNote } from '../../redux/notesSlice';

export const NoteCardComponent = (props: { note: Note }) => {
    const dispatch = useAppDispatch();
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{props.note.title}</h2>
                <p className="text-gray-700 text-base mb-4">{props.note.content}</p>
                <p className="text-gray-500 text-sm">{`Created at: ${props.note.createdAt}`}</p>
                <button 
                    onClick={() => dispatch(deleteNote(props.note.id))} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};