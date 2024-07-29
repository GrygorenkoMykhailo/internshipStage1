import { NextApiRequest, NextApiResponse } from "next";
import { NoteDAO } from "@/Types";
import { addNote } from "@/database/database";
import { Note } from "@/Types";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        const body: NoteDAO = req.body;
        const newNote: Note = { id: Date.now(), ...body }
        addNote(newNote);
        res.status(201).json(newNote);
    }else{
        res.status(400).send(null);
    }
}