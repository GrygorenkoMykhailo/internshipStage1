import { useContext, useRef } from 'react';
import { Note, NoteDAO } from '../../Types';
import { NoteContext } from '@/context/NoteContext';

export const CreateNoteComponent = () => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const context = useContext(NoteContext);

    const handleSubmit = () => {
        const title = titleRef.current?.value;
        const content = contentRef.current?.value;

        if(title && content){
            const newNote: NoteDAO = { 
                title,
                content,
                createdAt: new Date().toLocaleDateString(),
            };
            context?.createNote(newNote);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8">
            <h1 className="text-2xl font-bold mb-6">Create a New Note</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        ref={titleRef}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700">Content</label>
                    <textarea
                        id="content"
                        ref={contentRef}
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="button"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleSubmit}
                >
                    Create Note
                </button>
            </form>
        </div>
    );
};