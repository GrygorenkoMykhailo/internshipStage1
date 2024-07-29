import { Note } from "./Note"

export type NoteContextType = {
    notes: Note[],
    createNote(note: Note): void,
    deleteNote(id: number): void,
}