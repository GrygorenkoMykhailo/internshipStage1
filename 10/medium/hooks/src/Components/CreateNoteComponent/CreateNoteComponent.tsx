import React, { useContext } from 'react';
import { NoteContext } from '../../context/NoteContext';
import { Note, NoteContextType } from '../../types';
import { useForm, SubmitHandler } from 'react-hook-form';

type NoteForm = {
    title: string,
    content: string,
}

export const CreateNoteComponent = React.memo(() => {
    const { register, handleSubmit } = useForm<NoteForm>();
    const { createNote } = useContext(NoteContext) as NoteContextType;

    const onSubmit: SubmitHandler<NoteForm> = data => {
        createNote({
            id: Date.now(),
            content: (data as Note).content,
            title: (data as Note).title,
            createdAt: new Date(),
        });
    }

    return (
        <div className="max-w-md mx-auto bg-white p-8">
            <h1 className="text-2xl font-bold mb-6">Create a New Note</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input {...register('title')} type="text" id="title" required className="w-full px-3 py-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700">Content</label>
                    <textarea {...register('content')} id="content" rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded"/>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Create Note</button>
            </form>
        </div>
    );
});