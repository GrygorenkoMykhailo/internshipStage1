import { Note } from "./Note"
import { NoteDAO } from "./NoteDAO"

export type NoteContextType = {
    notes: Note[],
    createNote(note: NoteDAO): void,
    deleteNote(id: number): void,
}